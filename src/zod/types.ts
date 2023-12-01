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
  action: z.enum(["startWorkTime", "endWorkTime", "getSessionLight", "servo", "setPreferences"]),
  data: z.string().optional(),
  id: z.string().optional(),
  open: z.number().optional(),
  lowerBound: z.number().optional(),
  upperBound: z.number().optional(),
});

export const UserProfileModel = z.object({
  id: z.string(),
  gender: z.string(),
  birthdate: z.date(),
  minimumTemperature: z.number(),
  maximumTemperature: z.number(),
});