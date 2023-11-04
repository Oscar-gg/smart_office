import type { NextApiRequest, NextApiResponse } from "next";

import { deviceCaller } from "~/server/api/apiCaller";

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

  const originalObject = JSON.parse(original);
  const name = originalObject.name;
  const type = originalObject.type; 

  console.log("Original object: ", originalObject);

  if (!connectionId){
    res.status(400).json({
      message: "Error: Missing connection id",
    });
  } else if (!name || !type) {
    res.status(400).json({
      message: "Error: Missing name or type",
    });
  }

  await deviceCaller.setDevice({
    connectionId,
    name,
    type,
  });

  res.status(200).json({
    message: "Device type set",
  });
}
