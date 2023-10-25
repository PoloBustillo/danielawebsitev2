"use client";

import { BannerResponse, MensajeType } from "@/lib/types";
import Stars from "../icons/Stars";
import { useTheme } from "next-themes";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface BannerProps {
  lema?: MensajeType;
  frase?: MensajeType;
  banners: BannerResponse[];
}
const Banner: React.FC<BannerProps> = ({
  lema,
  frase,
  banners,
}: BannerProps) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [indexImg, setIndexImg] = useState(
    Math.floor(Math.random() * banners.length)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = Math.floor(Math.random() * banners.length);
      if (index == indexImg) index = Math.floor(Math.random() * banners.length);
      setIndexImg(index);
    }, 5000);
    return () => clearTimeout(timer);
  }, [indexImg]);

  return (
    <section className="banner-image">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
              <p> {lema?.enable ? lema?.message : ""}</p>
            </h1>
            <p className="mt-6 text-lg leading-8">
              {frase?.enable ? frase?.message : ""}
            </p>
            <p className="mt-6 text-medium font-extrabold leading-8 ">
              Psicóloga Daniela Diaz Merino
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Card isFooterBlurred>
                <motion.div
                  initial={{ y: -2 }}
                  animate={{ y: 2 }}
                  transition={{
                    type: "smooth",
                    repeatType: "mirror",
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="hidden sm:block -space-x-2 overflow-hidden"
                >
                  <Image
                    isZoomed
                    width={300}
                    height={280}
                    alt={banners[indexImg].description}
                    src={banners[indexImg].image}
                  />
                </motion.div>
                <CardFooter className="mb-1  -bottom-1 justify-between bg-purple/60 border-purple/10 border-1  py-1 absolute before:rounded-xl rounded-large  w-full shadow-small  z-10">
                  <p className="text-tiny text-offwhite">
                    {banners[indexImg].description}
                  </p>
                  <Button
                    className="text-tiny text-white bg-black/40"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    onClick={() => {
                      router.push(banners[indexImg].url!);
                    }}
                  >
                    Conoce más
                  </Button>
                </CardFooter>
              </Card>
              <div className="bannerBorder sm:pl-8">
                <div className="flex justify-center sm:justify-start">
                  <h3 className="text-2xl font-semibold mr-2">4.5</h3>

                  <Stars color={theme == "black" ? "white" : "black"}></Stars>
                </div>
                <div>
                  <h3 className="text-sm">En google y otras plataformas</h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" my-10 sk-ww-google-reviews"
            data-embed-id="214937"
          ></div>
          {/* DROPDOWN BUTTONS */}

          <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
              <div className="col-span-3 text-black">Sesiones</div>
              <div className="col-span-3 text-black">Terapias</div>
              <div className="col-span-3 sm:col-span-2 mt-2">
                <button
                  onClick={() => {
                    let element: HTMLElement = document.getElementsByClassName(
                      "simplybook-widget-button"
                    )[0] as HTMLElement;
                    element.click();
                    element.onload = function () {
                      document.body.scrollTop = 0;
                      document.documentElement.scrollTop = 0;
                    };
                  }}
                  className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded"
                >
                  Reserva ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
