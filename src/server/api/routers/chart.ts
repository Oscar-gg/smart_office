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

      // console.log(accumulateData);
      // console.log(result);
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
});
