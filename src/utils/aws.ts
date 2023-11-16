// Class to send commands to IoT devices

import type { z } from "zod";

import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
  GetConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

import type { PrismaClient, Device } from "@prisma/client";

import type { CommandObject } from "~/zod/types";

export const startWorkTime = async ({ db }: { db: PrismaClient }) => {
  const device = await getWorkTimeDevice({ db });
  if (device) {
    await sendCommand({ device, data: { action: "startWorkTime" } });
  }
};

export const endWorkTime = async ({
  db,
  id_session,
}: {
  db: PrismaClient;
  id_session: string;
}) => {
  const device = await getWorkTimeDevice({ db });
  if (device) {
    await sendCommand({
      device,
      data: { action: "endWorkTime", id: id_session },
    });
  }
};

export const getSessionLight = async ({
  db,
  id_session,
}: {
  db: PrismaClient;
  id_session: string;
}) => {
  const device = await getLightDevice({ db });
  if (device) {
    await sendCommand({
      device,
      data: { action: "getSessionLight", id: id_session },
    });
  }
};

export const openServo = async ({ db }: { db: PrismaClient }) => {
  const device = await getServoDevice({ db });
  if (device) {
    await sendCommand({
      device,
      data: { action: "servo", open: 1 },
    });
  }
};

const sendCommand = async ({
  device,
  data,
}: {
  device: Device;
  data: z.infer<typeof CommandObject>;
}) => {
  const callbackUrl = `https://${device.domain}/${device.stage}`;
  const client = new ApiGatewayManagementApiClient({
    endpoint: callbackUrl,
    region: "us-east-1",
  });

  const requestParams = {
    ConnectionId: device.connectionId,
    Data: JSON.stringify(data),
  };

  const command = new PostToConnectionCommand(requestParams);

  try {
    const result = await client.send(command);
    console.log("Result: ", result);
    return true;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

const getWorkTimeDevice = async ({ db }: { db: PrismaClient }) => {
  const device = await db.device.findFirst({
    where: {
      type: "ultrasonic",
    },
  });

  if (!device) {
    console.log("Error: ultrasonic device not found");
  }

  return device;
};

const getLightDevice = async ({ db }: { db: PrismaClient }) => {
  const device = await db.device.findFirst({
    where: {
      type: "light",
    },
  });

  if (!device) {
    console.log("Error: Light device not found");
  }

  return device;
};

const getServoDevice = async ({ db }: { db: PrismaClient }) => {
  const device = await db.device.findFirst({
    where: {
      type: "RFID",
    },
  });

  if (!device) {
    console.log("Error: Servo device not found");
  }

  return device;
};

export const removeInactiveConnections = async ({
  db,
}: {
  db: PrismaClient;
}) => {
  
  const devices = await db.device.findMany();
  
  for (const device of devices) {
    const isActive = await checkConnection({ device });
    if (!isActive) {
      await db.device.delete({
        where: {
          connectionId: device.connectionId,
        },
      });
    }
  }
};

const checkConnection = async ({ device }: { device: Device }) => {
  const callbackUrl = `https://${device.domain}/${device.stage}`;
  const client = new ApiGatewayManagementApiClient({
    endpoint: callbackUrl,
    region: "us-east-1",
  });

  const input = {
    ConnectionId: device.connectionId,
  };

  const command = new GetConnectionCommand(input);

  try {
    const response = await client.send(command);
    console.log("Result: ", response);

    if (response.LastActiveAt) {
      const now = new Date();
      // 300000 ms = 5 minutes
      if (now.getTime() - response.LastActiveAt.getTime() < 300000) {
        return true;
      }
    }

    return false;
  } catch (error) {
    // If an error occurs, assume the connection is no longer valid.
    console.log("error: ", error);
    return false;
  }
};
