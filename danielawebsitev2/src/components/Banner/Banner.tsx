"use client";

import { BannerResponse, MensajeType } from "@/lib/types";
import Stars from "../icons/Stars";
import { useTheme } from "next-themes";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
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
        <div className="mx-auto max-w-5xl pt-4 sm:pt-20 sm:pb-24">
          <div className="text-center">
            <h1 className="text-transparent bg-clip-text dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-red-900 dark:via-violet-200 dark:to-orange-500     bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-4xl font-bold tracking-tight sm:text-75px md:4px">
              <p> {lema?.enable ? lema?.message : ""}</p>
            </h1>

            <p className="mt-6 text-lg sm:text-2xl leading-8 mx-10 capitalize dark:text-slate-300">
              {frase?.enable ? frase?.message : ""}
            </p>
            <div className="flex md:flex-row flex-col">
              <Card
                isBlurred
                className="border-none bg-[#37354b]  dark:bg-default-100/50 max-w-[610px] m-4 p-10 pt-3 "
                //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
              >
                <CardBody className="flex flex-col my-3 justify-center">
                  <div className="flex  justify-center">
                    <div className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] dark:from-yellow-200 dark:via-red-500 dark:to-fuchsia-500 relative inline-flex items-center justify-center w-[30vh] h-[30-vh] text-gray-900  animate-morphdiv">
                      <div className="p-2">
                        <Avatar
                          radius="full"
                          color="secondary"
                          src="/assets/psicDaniela.jpg"
                          title="Psicologa Daniela Diaz"
                          className="w-[25vh] h-[25vh] text-large "
                        />
                      </div>
                    </div>
                  </div>
                  <p className="flex  justify-center text-medium text-[whitesmoke] font-extrabold leading-8">
                    Psicóloga Daniela Diaz Merino
                  </p>
                  <p className="flex mt-4  justify-center text-center text-small text-[whitesmoke]  leading-8">
                    Psicólogo Puebla Daniela Diaz es un Licenciada en Psicología
                    con consulta en la ciudad de Heroica Puebla de Zaragoza,
                    Puedes conocerla y reservar cita.Amplia experiencia en
                    diversas metodologías de la psicología. Terapia en educación
                    especial.
                  </p>
                </CardBody>
              </Card>{" "}
              <Card
                isBlurred
                className="border-none bg-[#37354b]  dark:bg-default-100/50 max-w-[380px] m-4 pt-3 "
                //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
              >
                <CardBody className="flex flex-col my-3 justify-center align-middle">
                  <div className="bannerBorder sm:pl-8 flex justify-center flex-col items-center">
                    <div className="flex flex-col justify-center align-middle ">
                      <h3 className="text-2xl text-center text-[whitesmoke] font-semibold flex flex-col justify-center align-middle">
                        4.8
                      </h3>

                      <Stars color={"yellow"}></Stars>
                    </div>
                    <div className="flex justify-center">
                      <h3 className="text-sm text-[whitesmoke]">
                        En Google y otras plataformas
                      </h3>
                    </div>
                  </div>

                  <div
                    className=" my-10 sk-ww-google-reviews flex"
                    data-embed-id="214937"
                  ></div>
                </CardBody>
              </Card>
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
