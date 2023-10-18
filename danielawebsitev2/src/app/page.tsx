import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import React from "react";
import { getMensajes } from "../lib/api";
import { MensajesResponse } from "@/lib/types";

const page = async () => {
  const { frase, lema, mensaje }: MensajesResponse = await getMensajes();
  return (
    <>
      <Banner lema={lema} frase={frase} />
      <Footer />
    </>
  );
};

export default page;
