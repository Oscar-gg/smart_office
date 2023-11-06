import { z } from "zod";

import { DeviceModel } from "~/zod/types";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sensorRouter = createTRPCRouter({
  getLight: publicProcedure.query(async ({ ctx }) => {
    const light = await ctx.db.temperature.findMany({});
    return light;
  }),
  addLight: systemProcedure
    .input(z.object({ data: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.lightLevel.create({
          data: {
            value: input.data,
          },
        });
        return true;
      } catch (error) {
        console.log("error: ", error);
        return false;
      }
    }),
  getTemperature: publicProcedure.query(async ({ ctx }) => {
    const temperatures = await ctx.db.lightLevel.findMany({});

    return temperatures;
  }),
  addTemperature: systemProcedure
    .input(z.object({ data: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.temperature.create({
          data: {
            value: input.data,
          },
        });
        return true;
      } catch (error) {
        console.log("error: ", error);
        return false;
      }
    }),
  getRFIDLectures: publicProcedure.query(async ({ ctx }) => {
    const lectures = await ctx.db.rFIDLectures.findMany({});

    return lectures;
  }),
  addRFIDLecture: systemProcedure
    .input(z.object({ data: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.rFIDLectures.create({
          data: {
            value: input.data,
          },
        });
        return true;
      } catch (error) {
        console.log("error: ", error);
        return false;
      }
    }),
});
