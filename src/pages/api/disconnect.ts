import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log("body", req.body);
  console.log("query", req.query);
  
  res.status(200).json({
    message: JSON.stringify(req.body),
  });
}