import Banner from "@/components/Banner/Banner";

import React from "react";
import { getBannerImages, getMensajes } from "../lib/api";
import { BannerResponse, MensajesResponseType } from "@/lib/types";
import Cards from "@/components/Cards/Cards";
import Newsletter from "@/components/Newsletter/Newsletter";

const page = async () => {
  const { frase, lema, mensaje }: MensajesResponseType = await getMensajes();

  const bannerResponse: BannerResponse[] = await getBannerImages();

  return (
    <main>
      <Banner lema={lema} frase={frase} banners={bannerResponse} />
      <Cards></Cards>
      <Newsletter />
    </main>
  );
};

export default page;
