import DesktopWrapper from "@/app/wrappers/desktopWrapper";
import Banner from "@/components/Banner/Banner";
import Cards from "@/components/Cards/Cards";
import Carousel from "@/components/Carousel/Carousel";
import Contact from "@/components/ContactSection/Contact";
import Faq from "@/components/FAQ/Faq";
import Newsletter from "@/components/Footer/Newsletter/Newsletter";
import {
  BlogArticleType,
  CarouselResponseType,
  MensajesResponseType,
  PageDataType,
  TerapiasResponseType,
} from "@/lib/types";
import {
  getBlogs,
  getCarouselData,
  getMensajes,
  getPageSkeleton,
  getTerapias,
} from "../lib/api";
import BlogsSection from "@/components/BlogsSection/BlogsSection";

export const dynamic = "force-dynamic";

const page = async () => {
  const [carouselData, mensajes, areasTerapias, pageData, blogs]: [
    carouselData: CarouselResponseType[],
    mensajes: MensajesResponseType,
    areasTerapias: TerapiasResponseType,
    pageData: (PageDataType & { id: string })[],
    blogs: BlogArticleType[]
  ] = await Promise.all([
    getCarouselData(),
    getMensajes(),
    getTerapias(),
    getPageSkeleton(),
    getBlogs(),
  ]);

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
            case "contact":
              return <Contact></Contact>;

              break;
            case "fqa":
              return <Faq></Faq>;
              break;
            case "blogs":
              return <BlogsSection blogs={blogs}></BlogsSection>;
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
