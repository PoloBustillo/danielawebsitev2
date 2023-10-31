"use client";

import { BannerResponse, MensajeType } from "@/lib/types";

import { useTheme } from "next-themes";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Bio from "./Bio/Bio";
import Reviews from "./Reviews/Reviews";
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
        <div className="mx-auto max-w-5xl pt-4 sm:pt-20 sm:pb-24">
          <div className="text-center">
            <h1 className="text-transparent bg-clip-text dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-red-900 dark:via-violet-200 dark:to-orange-500     bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-4xl font-bold tracking-tight sm:text-75px md:4px">
              <p> {lema?.enable ? lema?.message : ""}</p>
            </h1>

            <p className="mt-6 text-lg sm:text-2xl leading-8 mx-10 capitalize dark:text-slate-300">
              {frase?.enable ? frase?.message : ""}
            </p>
            <div className="flex md:flex-row flex-col">
              <Bio></Bio>
              <Reviews></Reviews>
            </div>

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
                <CardFooter className="mb-1  -bottom-1 justify-between bg-purple-900/60 border-purple-900/10 border-1  py-1 absolute before:rounded-xl rounded-large  w-full shadow-small  z-10">
                  <p className="text-tiny text-[whitesmoke]">
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
            </div>
          </div>

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
