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
  PageDataType,
  TerapiasResponseType,
} from "@/lib/types";
import {
  getCarouselData,
  getMensajes,
  getPageSkeleton,
  getTerapias,
} from "../lib/api";

export const dynamic = "force-dynamic";

const page = async () => {
  const [carouselData, mensajes, areasTerapias, pageData]: [
    carouselData: CarouselResponseType[],
    mensajes: MensajesResponseType,
    areasTerapias: TerapiasResponseType,
    pageData: (PageDataType & { id: string })[]
  ] = await Promise.all([
    getCarouselData(),
    getMensajes(),
    getTerapias(),
    getPageSkeleton(),
  ]);
  console.log(pageData);

  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();

  return (
    <>
      <main>
        {pageData.map((identifier) => {
          switch (identifier.id) {
            case "banner":
              return <Banner lema={mensajes.lema} frase={mensajes.frase} />;
              break;
            case "servicios":
              return <Cards terapias={terapias}></Cards>;
              break;
            case "carrousel":
              return (
                <DesktopWrapper>
                  <Carousel carouselData={carouselData}></Carousel>
                </DesktopWrapper>
              );

              break;
            case "fqa":
              return <Contact></Contact>;

              break;
            case "contact":
              return <Faq></Faq>;
              break;

            default:
              break;
          }
        })}
      </main>
      <Newsletter />
    </>
  );
};

export default page;
