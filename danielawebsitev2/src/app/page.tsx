import Banner from "@/components/Banner/Banner";

import React from "react";
import { getMensajes, getTerapias } from "../lib/api";
import { MensajesResponseType, TerapiasResponseType } from "@/lib/types";
import Cards from "@/components/Cards/Cards";

export const dynamic = "force-dynamic";

const page = async () => {
  const { frase, lema }: MensajesResponseType =
    (await getMensajes()) as MensajesResponseType;
  const areasTerapias: TerapiasResponseType =
    (await getTerapias()) as TerapiasResponseType;
  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();

  return (
    <main>
      <Banner lema={lema} frase={frase} />
      <Cards terapias={terapias}></Cards>
    </main>
  );
};

export default page;
