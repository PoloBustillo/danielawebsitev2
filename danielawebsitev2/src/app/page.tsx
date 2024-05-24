import DesktopWrapper from "@/app/wrappers/desktopWrapper";
import Banner from "@/components/Banner/Banner";
import Cards from "@/components/Cards/Cards";
import Carousel from "@/components/Carousel/Carousel";
import Contact from "@/components/ContactSection/Contact";
import Faq from "@/components/FAQ/Faq";
import Newsletter from "@/components/Footer/Newsletter/Newsletter";
import {
  CarouselResponseType,
  MensajesResponseType,
  TerapiasResponseType,
} from "@/lib/types";
import { getCarouselData, getMensajes, getTerapias } from "../lib/api";

export const dynamic = "force-dynamic";

const page = async () => {
  const [carouselData, mensajes, areasTerapias]: [
    carouselData: CarouselResponseType[],
    mensajes: MensajesResponseType,
    areasTerapias: TerapiasResponseType
  ] = await Promise.all([getCarouselData(), getMensajes(), getTerapias()]);

  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();

  return (
    <>
      <main>
        <Banner lema={mensajes.lema} frase={mensajes.frase} />
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
