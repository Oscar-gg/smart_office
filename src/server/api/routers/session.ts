import { z } from "zod";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import {
  onRfidDetection,
  getActiveSessionId,
  getActiveUserId,
} from "~/utils/sessions";

import { openServo } from "~/utils/aws";
import { TRPCError } from "@trpc/server";

// High level router to handle sessions and their data.

export const sessionRouter = createTRPCRouter({
  sessionManagement: systemProcedure
    .input(z.object({ rfidLecture: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await onRfidDetection({
          db: ctx.db,
          idRFID: input.rfidLecture,
        });

        if (result === true) {
          await openServo({ db: ctx.db });
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          await ctx.db.log.create({
            data: {
              code: error.code,
              message: error.message,
            },
          });
        }
      }
    }),

  // Get the id, compare it with user id to display status in the frontend.
  getSessionId: systemProcedure.query(async ({ ctx }) => {
    return await getActiveSessionId({ db: ctx.db });
  }),
  // Get the id, compare it with user id to display status in the frontend.
  getActiveUserId: publicProcedure.query(async ({ ctx }) => {
    return await getActiveUserId({ db: ctx.db });
  }),
});
