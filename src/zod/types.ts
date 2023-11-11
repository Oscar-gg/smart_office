import { z } from "zod";

// Types for the API

export const DeviceTypeModel = z.object({
  name: z.string(),
  type: z.string(),
});

// Must match with nodeMCU
export const DeviceDataType = z.enum([
  "temperature",
  "RFID",
  "light",
  "movement",
  "workTime",
]);

export const CommandObject = z.object({
  action: z.enum(["startWorkTime", "endWorkTime", "getSessionLight", "servo"]),
  data: z.string().optional(),
  id: z.string().optional(),
  open: z.number().optional(),
});
