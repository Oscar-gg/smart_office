import { z } from "zod";

import { DeviceModel } from "~/zod/types";

import {
  systemProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

export const AWSRouter = createTRPCRouter({
  sendMessage: systemProcedure
    .input(z.object({DeviceModel, message: z.string()}))
    .mutation(async ({ input }) => {
      try {
        const callbackUrl = `https://${input.DeviceModel.domain}/${input.DeviceModel.stage}`;

        const client = new ApiGatewayManagementApiClient({
          endpoint: callbackUrl,
        });

        const requestParams = {
          ConnectionId: input.DeviceModel.connectionId,
          Data: JSON.stringify({
            action: "message",
            content: input.message,
          }),
        };

        const command = new PostToConnectionCommand(requestParams);

        const result = await client.send(command);
        return JSON.stringify(result);
      } catch (error) {
        console.log("error: ", error);
      }

      return false;
    }),
});
