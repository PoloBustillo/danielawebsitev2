import Banner from "@/components/Banner/Banner";

import React from "react";
import { getMensajes, getTerapias, getCarouselData } from "../lib/api";
import {
  CarouselResponseType,
  MensajesResponseType,
  TerapiasResponseType,
} from "@/lib/types";
import Cards from "@/components/Cards/Cards";
import Newsletter from "@/components/Footer/Newsletter/Newsletter";
import Contact from "@/components/ContactSection/Contact";
import Faq from "@/components/FAQ/Faq";
import Carousel from "@/components/Carousel/Carousel";
import DesktopWrapper from "@/wrappers/desktopWrapper";

export const dynamic = "force-dynamic";

const page = async () => {
  const { frase, lema }: MensajesResponseType =
    (await getMensajes()) as MensajesResponseType;
  const areasTerapias: TerapiasResponseType =
    (await getTerapias()) as TerapiasResponseType;

  const carouselData: CarouselResponseType[] =
    (await getCarouselData()) as CarouselResponseType[];

  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();

  return (
    <>
      <main>
        <Banner lema={lema} frase={frase} />
        <Cards terapias={terapias}></Cards>
        <DesktopWrapper>
          <Carousel carouselData={carouselData}></Carousel>
        </DesktopWrapper>
        <Contact></Contact>
        <Faq></Faq>
      </main>
      <Newsletter />
    </>
  );
};

export default page;
