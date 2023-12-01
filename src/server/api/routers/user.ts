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

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany({
      include: {
        Preferences: true,
      },
    });
  }),

  getUserIds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany({
      select: {
        id: true,
      },
      orderBy: {
        lastRequest: "desc",
      },
    });
  }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Preferences: true,
        },
      });
    }),

  getUserProfileById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Preferences: true,
          rfid: true,
        },
      });
    }),

  getPossibleRFIDUsers: publicProcedure
    .input(z.object({ idRfid: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany({
        where: {
          OR: [
            { id_RFID: null },
            { id_RFID: undefined },
            { id_RFID: input.idRfid },
          ],
        },
        select: {
          id: true,
          email: true,
        },
      });
    }),

  modifyUserProfile: protectedProcedure
    .input(UserProfileModel)
    .mutation(async ({ ctx, input }) => {
      if (
        ctx.session.user.id === input.id ||
        compareRole({ requiredRole: "admin", userRole: ctx.session.user.role })
      ) {
        await ctx.db.user.update({
          where: {
            id: input.id,
          },
          data: {
            gender: input.gender,
            birthday: input.birthdate,
          },
        });

        await ctx.db.preferences.upsert({
          where: {
            id_user: input.id,
          },
          create: {
            id_user: input.id,
            temp_val_min: input.minimumTemperature,
            temp_val_max: input.maximumTemperature,
          },
          update: {
            temp_val_min: input.minimumTemperature,
            temp_val_max: input.maximumTemperature,
          },
        });

        return "Se han guardado las modificaciones del usuario.";
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No tienes permisos para modificar este usuario.",
        });
      }
    }),
});
