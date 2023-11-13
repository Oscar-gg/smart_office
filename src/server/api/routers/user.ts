import { z } from "zod";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
          name: true,
        },
      });
    }),
});
