import { z } from "zod";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const rfidRouter = createTRPCRouter({
  getRFIDIds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.rFID.findMany({
      select: {
        id_RFID: true,
      },
    });
  }),

  getRFIDById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.rFID.findUnique({
        where: {
          id_RFID: input.id,
        },
        include: {
          user: true,
        },
      });
    }),

  updateRFIDOwner: publicProcedure
    .input(z.object({ id: z.string(), id_user: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        if (input.id_user === "") {
          await ctx.db.rFID.update({
            where: {
              id_RFID: input.id,
            },
            data: {
              user: {
                disconnect: true,
              },
              active: false,
            },
          });
          return "Se ha removido el usuario del RFID seleccionado.";
        } else {
          const hadRFID = await ctx.db.user.findUnique({
            where: {
              id: input.id_user,
            },
            select: {
              id_RFID: true,
            },
          });
          if (hadRFID) {
            return "El usuario seleccionado ya tiene un RFID asignado.";
          }

          await ctx.db.rFID.update({
            where: {
              id_RFID: input.id,
            },
            data: {
              user: {
                connect: {
                  id: input.id_user,
                },
              },
              active: true,
            },
          });
          return "Se ha modificado el usuario del RFID correctamente";
        }
      } catch (error) {
        console.log("error: ", error);
        return "Ha ocurrido un error al modificar el usuario del RFID";
      }
    }),
});
