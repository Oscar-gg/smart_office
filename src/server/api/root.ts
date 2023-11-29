import { createTRPCRouter } from "~/server/api/trpc";
import { deviceRouter } from "~/server/api/routers/devices";
import { AWSRouter } from "~/server/api/routers/aws";
import { sensorRouter } from "~/server/api/routers/sensors";
import { sessionRouter } from "~/server/api/routers/session";
import { userRouter } from "~/server/api/routers/user";
import { logRouter } from "~/server/api/routers/logs";
import { rfidRouter } from "~/server/api/routers/rfid";
import { chartRouter } from "./routers/chart";

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
  user: userRouter,
  log: logRouter,
  rfid: rfidRouter,
  chart: chartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
