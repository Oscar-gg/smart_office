import { z } from "zod";

export const DeviceModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  connectionId: z.string(),
  stage: z.string().nullish(),
  domain: z.string(),
});

export const DeviceTypeModel = z.object({
  name: z.string(),
  type: z.string(),
});

// Must match with nodeMCU
export const DeviceDataType = z.enum(["temperature", "RFID", "light", "movement"]);
