import { z } from "zod";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { onRfidDetection, getActiveSessionId } from "~/utils/sessions";

import { openServo } from "~/utils/aws";

// High level router to handle sessions and their data.

export const sessionRouter = createTRPCRouter({
  sessionManagement: systemProcedure
    .input(z.object({ rfidLecture: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await onRfidDetection({
        db: ctx.db,
        idRFID: input.rfidLecture,
        userId: ctx.session.user.id,
      });

      if (result === true) {
        await openServo({ db: ctx.db });
      } else {
        // Save the log in the database.
        await ctx.db.log.create({
          data: {
            message: result,
          },
        });
      }
    }),

  // Get the id, compare it with user id to display status in the frontend.
  getSessionId: systemProcedure.query(async ({ ctx }) => {
    return await getActiveSessionId({ db: ctx.db });
  }),
});
