// Functions to get the data used to display in charts

import { z } from "zod";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { compareRole } from "~/utils/role";
import { UserProfileModel } from "~/zod/types";

import { TRPCError } from "@trpc/server";
import { getStartAndEnd, groupByTime } from "~/utils/dates";

export const chartRouter = createTRPCRouter({
  getWorkTime: protectedProcedure
    .input(
      z.object({
        monthly: z.boolean(),
        time: z.date(),
        manyUsers: z.boolean().optional(),
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (
        input.manyUsers &&
        !compareRole({
          requiredRole: "admin",
          userRole: ctx?.session?.user.role,
        })
      ) {
        // throw new TRPCError({
        //   code: "UNAUTHORIZED",
        //   message:
        //     "No tienes permisos para acceder a información de todos los usuarios.",
        // });
      }

      const { start, end } = getStartAndEnd({
        time: input.time,
        monthly: input.monthly,
      });

      // Get the sessions corresponding to the time period
      const sessions = await ctx.db.sesion.findMany({
        where: {
          AND: [
            { ...(input.manyUsers ? {} : { id_user: input.userId }) },
            {
              sesionStart: {
                gte: start,
              },
            },
            {
              sesionEnd: {
                lte: end,
              },
            },
          ],
        },
        select: {
          sesionStart: true,
          WorkingTime: {
            select: {
              workTime: true,
            },
          },
        },
      });

      const accumulateData = sessions.map((item) => {
        return {
          x: item.sesionStart,
          y: item?.WorkingTime?.workTime ?? 0,
        };
      });

      const result = groupByTime({
        data: accumulateData,
        byMonth: input.monthly,
      });

      if (result) return result;
      return null;
    }),

  getTemperature: publicProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.temperature.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        temp_registered: true,
      },
    });
  }),

  getLightOnOff: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        allUsers: z.boolean().optional(),
        now: z.date().optional(),
        byMonth: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const date = input.now ?? new Date();

      if (input.byMonth) {
        date.setMonth(date.getMonth() - 1);
      } else {
        date.setDate(date.getDate() - 7);
      }

      if (
        input.allUsers &&
        !compareRole({
          requiredRole: "admin",
          userRole: ctx?.session?.user.role,
        })
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "No tienes permisos para acceder a la información de todos los usuarios.",
        });
      }

      const sessions = input.allUsers
        ? await ctx.db.sesion.findMany({
            where: {
              sesionStart: {
                gte: date,
              },
            },

            select: {
              LightConsumption: {
                select: {
                  lightAfter: true,
                },
              },
            },
          })
        : await ctx.db.sesion.findMany({
            where: {
              id_user: input.id,
              sesionStart: {
                gte: date,
              },
            },
            select: {
              LightConsumption: {
                select: {
                  lightAfter: true,
                },
              },
            },
          });

      let lightOn = 0;
      let lightOff = 0;

      for (const session of sessions) {
        if (!session.LightConsumption) continue;

        if (session.LightConsumption.lightAfter === "Encendido") {
          lightOn++;
        } else if (session.LightConsumption.lightAfter === "Apagado") {
          lightOff++;
        }
      }

      return { lightOn, lightOff };
    }),

  getLightOnOffByUser: protectedProcedure
    .input(
      z.object({
        now: z.date().optional(),
        byMonth: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const date = input.now ?? new Date();

      if (input.byMonth) {
        date.setMonth(date.getMonth() - 1);
      } else {
        date.setDate(date.getDate() - 7);
      }

      const sessions = await ctx.db.sesion.findMany({
        where: {
          sesionStart: {
            gte: date,
          },
        },

        select: {
          LightConsumption: {
            select: {
              lightAfter: true,
              sesion: {
                select: {
                  user: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const userLightOnOff = new Map<
        string,
        { lightOn: number; lightOff: number }
      >();

      for (const session of sessions) {
        if (
          !session?.LightConsumption?.sesion?.user.name
        )
          continue;

        if (
          !userLightOnOff.has(
            session?.LightConsumption?.sesion?.user.name ?? "Sin nombre",
          )
        ) {
          userLightOnOff.set(
            session?.LightConsumption?.sesion?.user.name ?? "Sin nombre",
            { lightOn: 0, lightOff: 0 },
          );
        }

        const prendidoPrev =
          userLightOnOff.get(session?.LightConsumption?.sesion?.user.name ?? "")
            ?.lightOn ?? 0;
        const apagadoPrev =
          userLightOnOff.get(session?.LightConsumption?.sesion?.user.name ?? "")
            ?.lightOff ?? 0;

        if (session.LightConsumption.lightAfter === "Encendido") {
          userLightOnOff.set(session?.LightConsumption?.sesion?.user.name, {
            lightOn: prendidoPrev + 1,
            lightOff: apagadoPrev,
          });
        } else if (session.LightConsumption.lightAfter === "Apagado") {
          userLightOnOff.set(session?.LightConsumption?.sesion?.user.name, {
            lightOn: prendidoPrev,
            lightOff: apagadoPrev + 1,
          });
        }
      }

      const graphOn: [string, number][] = Array.from(
        userLightOnOff,
        ([key, value]) => [key, value.lightOn],
      );
      const graphOff: [string, number][] = Array.from(
        userLightOnOff,
        ([key, value]) => [key, value.lightOff],
      );

      return { graphOn, graphOff };
    }),

  getAlarmCount: protectedProcedure
    .input(
      z.object({
        now: z.date().optional(),
        byMonth: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const date = input.now ?? new Date();

      if (input.byMonth) {
        date.setMonth(date.getMonth() - 1);
      } else {
        date.setDate(date.getDate() - 7);
      }

      const sessions = await ctx.db.movement.findMany({
        where: {
          triggerTime: {
            gte: date,
          },
        },
        select: {
          duringSession: true,
        },
      });

      let alarmInSession = 0;
      let alarmOutOfSession = 0;

      for (const session of sessions) {
        if (session.duringSession) {
          alarmInSession++;
        } else {
          alarmOutOfSession++;
        }
      }

      return { alarmInSession, alarmOutOfSession };
    }),

  getTemperatures: protectedProcedure
    .input(
      z.object({
        now: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const date = input.now ? new Date(input.now) : new Date();

      date.setDate(date.getDate() - 1);
      
      const temperatures = await ctx.db.temperature.findMany({
        where: {
          createdAt: {
            lte: input.now,
            gte: date,
          },
        },
      });

      return temperatures.map((item) => ({
        date: item.createdAt,
        temp: item.temp_registered,
      }));
    }),

  getLimits: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const limits = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Preferences: {
            select: {
              temp_val_min: true,
              temp_val_max: true,
            },
          },
        },
      });

      return {
        min: limits?.Preferences?.temp_val_min ?? 15,
        max: limits?.Preferences?.temp_val_max ?? 25,
      };
    }),
});
