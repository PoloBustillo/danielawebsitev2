import { getTerapias } from "@/lib/api";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const artist = await getTerapias(id);
  return <div>SERVICIO</div>;
};
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "123" } }, { params: { id: "124" } }],
    fallback: false,
  };
}

export default page;
