import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: ({ path, error, ctx }) => {
    void (async () => {
      if (env.NODE_ENV === "development") {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
        );
      }

      ctx?.session?.user.id && ctx.session.user.id != "-1"
        ? await ctx?.db.log.create({
            data: {
              code: error.code,
              message: error.message,
              id_user: ctx?.session?.user.id,
            },
          })
        : await ctx?.db.log.create({
            data: {
              code: error.code,
              message: error.message,
            },
          });
    })();
  },
});
