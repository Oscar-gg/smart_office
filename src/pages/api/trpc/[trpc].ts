import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error, ctx }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );

          ctx?.session?.user.id
            ? ctx?.db.log.create({
                data: {
                  code: error.code,
                  message: error.message,
                  id_user: ctx?.session?.user.id,
                },
              })
            : ctx?.db.log.create({
                data: {
                  code: error.code,
                  message: error.message,
                },
              });
        }
      : ({ error, ctx }) => {
          ctx?.session?.user.id
            ? ctx?.db.log.create({
                data: {
                  code: error.code,
                  message: error.message,
                  id_user: ctx?.session?.user.id,
                },
              })
            : ctx?.db.log.create({
                data: {
                  code: error.code,
                  message: error.message,
                },
              });
        },
});
