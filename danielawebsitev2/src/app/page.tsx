import Banner from "@/components/Banner/Banner";

import React from "react";
import { getMensajes } from "../lib/api";
import { MensajesResponseType } from "@/lib/types";
import Cards from "@/components/Cards/Cards";

export const dynamic = "force-dynamic";

const page = async () => {
  const { frase, lema }: MensajesResponseType =
    (await getMensajes()) as MensajesResponseType;

  return (
    <main>
      <Banner lema={lema} frase={frase} />
      <Cards></Cards>
    </main>
  );
};

export default page;
