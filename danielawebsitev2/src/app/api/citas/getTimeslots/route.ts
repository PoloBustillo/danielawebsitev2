import axios from "axios";

import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const headersList = headers();
  const token = headersList.get("x-simplybook-token");

  let data = JSON.stringify({
    company: "psicdaniela",
    login: "admin",
    password: "tacodaltonginger1",
  });

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://user-api-v2.simplybook.me/admin/schedule/available-slots?date=2024-08-29&provider_id=1&service_id=2",
    headers: {
      "X-Company-Login": "psicdaniela",
      "X-Token": token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response = await axios.request(config);

  return Response.json({ data: response.data });
}
