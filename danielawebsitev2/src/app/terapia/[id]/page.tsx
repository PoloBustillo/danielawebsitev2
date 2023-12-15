import { getTerapia, getTerapias } from "@/lib/api";
import { TerapiasResponseType } from "@/lib/types";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const artist = await getTerapia(id);

  return <div>SERVICIO</div>;
};

export async function generateStaticParams() {
  const areasTerapias: TerapiasResponseType =
    (await getTerapias()) as TerapiasResponseType;
  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();
  return terapias.map((terapia) => {
    return { id: encodeURIComponent(terapia.name!) };
  });
}

export default page;
