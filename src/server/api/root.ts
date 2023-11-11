import { createTRPCRouter } from "~/server/api/trpc";
import { deviceRouter } from "~/server/api/routers/devices";
import { AWSRouter } from "~/server/api/routers/aws";
import { sensorRouter } from "~/server/api/routers/sensors";
import { sessionRouter } from "./routers/session";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  device: deviceRouter,
  aws: AWSRouter,
  sensor: sensorRouter,
  session: sessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
