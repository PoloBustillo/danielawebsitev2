import axios from "axios";

import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const headersList = headers();
  const token = headersList.get("x-simplybook-token");
  req.headers.set("Access-Control-Allow-Origin:", "/'*/'");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://user-api-v2.simplybook.me/admin/schedule/available-slots?date=${
      new Date().toISOString().split("T")[0]
    }&provider_id=1&service_id=2`,
    headers: {
      "X-Company-Login": "psicdaniela",
      "X-Token": token,
      "Content-Type": "application/json",
    },
  };

  let response = await axios.request(config);

  return Response.json({});
}
