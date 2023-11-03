import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { deviceRouter } from "~/server/api/routers/devices";
import { AWSRouter } from "~/server/api/routers/aws";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  device: deviceRouter,
  aws: AWSRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
