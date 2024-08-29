import axios from "axios";

import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const headersList = headers();
  const token = headersList.get("x-simplybook-token");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://user-api-v2.simplybook.me/admin/services?on_page=15`,
    headers: {
      "X-Company-Login": "psicdaniela",
      "X-Token": token,
      "Content-Type": "application/json",
    },
  };

  let response = await axios.request(config);

  return Response.json(response.data);
}
