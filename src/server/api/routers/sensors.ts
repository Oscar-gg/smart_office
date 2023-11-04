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
  getTemperature: publicProcedure.query(async ({ ctx }) => {
    const temperatures = await ctx.db.lightLevel.findMany({});

    return temperatures;
  }),
});
