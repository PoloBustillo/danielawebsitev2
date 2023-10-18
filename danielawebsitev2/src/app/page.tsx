import Banner from "@/components/Banner/Banner";

import React from "react";
import { getMensajes } from "../lib/api";
import { MensajesResponse } from "@/lib/types";
import Cards from "@/components/Cards/Cards";
import Newsletter from "@/components/Newsletter/Newsletter";

const page = async () => {
  const { frase, lema, mensaje }: MensajesResponse = await getMensajes();
  return (
    <main>
      <Banner lema={lema} frase={frase} />
      <Cards></Cards>
      <Newsletter />
    </main>
  );
};

export default page;
