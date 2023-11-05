import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

// Used to call TRPC procedures from the pages/api folder

export const deviceCaller = appRouter.device.createCaller({
  session: {
    user: {
      id: "-1",
      email: "@admin",
      role: "system",
    },
    expires: new Date(`${new Date().getFullYear() + 2}-01-01`).toISOString(),
  },
  db,
});

export const awsCaller = appRouter.aws.createCaller({
  session: {
    user: {
      id: "-1",
      email: "@admin",
      role: "system",
    },
    expires: new Date(`${new Date().getFullYear() + 2}-01-01`).toISOString(),
  },
  db,
});
