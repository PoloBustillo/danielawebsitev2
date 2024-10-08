"use client";
import getURL from "@/lib/api";
import { TerapiaType } from "@/lib/types";
import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Cards({ terapias }: { terapias: TerapiaType[] }) {
  const router = useRouter();

  return (
    <section id="servicios">
      <div className="relative px-6 lg:px-8">
        <div className="m-auto max-w-7xl pt-4 sm:pt-14">
          <div className="text-center">
            <h1 className="hidden md:block mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#37354b] md:text-5xl lg:text-6xl dark:text-white">
              Empieza tu camino al bienestar... Selecciona uno de{" "}
              <span
                className="underline underline-offset-3 decoration-8 decoration-pink-400
               dark:decoration-pink-600 text-transparent bg-clip-text dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))]
                dark:from-red-900 dark:via-violet-200 dark:to-orange-500 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
                 from-slate-900 via-purple-900 to-slate-900 text-7xl font-bold tracking-tight sm:text-75px md:4px"
              >
                Nuestros Servicios
              </span>{" "}
            </h1>
            <p className="hidden md:block text-xl mb-6 font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Puedes checar sus caracteristicas, costos, y duración.
            </p>
            <span className="md:hidden text-transparent bg-clip-text dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-red-900 dark:via-violet-200 dark:to-orange-500 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-7xl font-bold tracking-tight sm:text-75px md:4px">
              Nuestros Servicios
            </span>
            <p className="md:hidden text-xl mb-10 font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Puedes checar sus caracteristicas, costos, y duración.
            </p>
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {terapias.map((terapia, index) => (
              <Card
                isFooterBlurred
                key={index}
                isPressable
                shadow="sm"
                onPress={() =>
                  router.push(
                    getURL(`terapia/${encodeURIComponent(terapia.name!)}`)
                  )
                }
                className={`h-[300px] dark:bg-[#1B1B1B] dark:hover:bg-[#d6297b] bg-[#d6297b] hover:text-[#37354b] hover:bg-[#1B1B1B]`}
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start hover:text-[#1B1B1B]">
                  <p className="text-tiny text-white/60 uppercase font-bold ">
                    {terapia.type}
                  </p>
                  <div className="text-white/90 font-medium text-xl ">
                    {terapia.name}
                  </div>
                </CardHeader>
                <Image
                  removeWrapper
                  isZoomed
                  alt="Terapia familiar"
                  className="z-0 m-auto h-[70%] w-full object-scale-down"
                  src={terapia.imageBanner}
                />

                <CardFooter className="absolute mix-blend-plus-darker bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col ">
                      <p className="text-tiny hover:text-medium text-white mb-4">
                        {terapia.description}
                      </p>
                      {/* <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            title="Like post"
                            className="flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 fill-current"
                            >
                              <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            title="Add a comment"
                            className="flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 fill-current"
                            >
                              <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            title="Share post"
                            className="flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 fill-current"
                            >
                              <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
                            </svg>
                          </button>
                        </div>
                        <button
                          type="button"
                          title="Bookmark post"
                          className="flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-5 h-5 fill-current"
                          >
                            <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                          </svg>
                        </button>
                      </div> */}
                      <div>
                        {terapia.costos.map((costo, index) => {
                          return (
                            <div
                              key={costo + index.toString()}
                              className="flex gap-1"
                            >
                              <p className="capitalize text-white text-small">
                                {costo.type}
                              </p>
                              <p className="capitalize font-semibold text-white text-md">
                                {`$${costo.values}`}
                              </p>
                            </div>
                          );
                        })}
                        <div>
                          <p className="capitalize text-white text-small">
                            Duración: {`${terapia.duration} min.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
