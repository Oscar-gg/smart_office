import type { NextApiRequest, NextApiResponse } from "next";

import { deviceCaller } from "~/server/api/apiCaller";

import { DeviceTypeModel } from "~/zod/types";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Debug
  // console.log("Device type triggerd: ");
  // console.log("body", req.body);
  // console.log("query", req.query);

  const { connectionId, original } = req.body;

  if (!connectionId) {
    res.status(400).json({
      message: "Error: Missing connection id",
    });
  }

  try {
    const deviceObject = DeviceTypeModel.parse(JSON.parse(original as string));

    const name = deviceObject.name;
    const type = deviceObject.type;

    console.log("Original object: ", deviceObject);

    await deviceCaller.setDevice({
      connectionId,
      name,
      type,
    });

    res.status(200).json({
      message: "Device type set",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: "Error: " + JSON.stringify(error),
    });
  }
}
