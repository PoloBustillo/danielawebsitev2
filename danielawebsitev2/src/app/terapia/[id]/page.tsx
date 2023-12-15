import { getTerapia, getTerapias } from "@/lib/api";
import { TerapiasResponseType } from "@/lib/types";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const artist = await getTerapia(id);

  return <div>SERVICIO</div>;
};
export async function getStaticPaths() {
  const areasTerapias: TerapiasResponseType =
    (await getTerapias()) as TerapiasResponseType;
  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();
  let array = terapias.map((terapia) => {
    console.log(encodeURIComponent(terapia.name!));
    return { params: { id: encodeURIComponent(terapia.name!) } };
  });
  return {
    paths: array,
    fallback: false,
  };
}

export default page;
