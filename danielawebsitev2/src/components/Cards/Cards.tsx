"use client";
import React from "react";
import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { TerapiaType } from "@/lib/types";

export default function Cards({ terapias }: { terapias: TerapiaType[] }) {
  const list = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <section id="servicios" className="mx-20 mb-5">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {terapias.map((terapia, index) => (
          <Card
            isFooterBlurred
            key={index}
            isPressable
            isHoverable
            shadow="sm"
            onPress={() => console.log("item pressed")}
            className="h-[300px] dark:bg-[#37354b] bg-[#1B1B1B] hover:text-[#1B1B1B]"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start hover:text-[#1B1B1B]">
              <p className="text-tiny text-white/60 uppercase font-bold ">
                {terapia.type}
              </p>
              <h4 className="text-white/90 font-medium text-xl ">
                {terapia.name}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Terapia familiar"
              className="z-0 w-full h-full object-cover"
              src="/assets/cartoons/2.png"
            />

            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">
                    {terapia.description}
                  </p>
                  <p className="text-tiny text-white/60">
                    {terapia.costos.at(0)?.type}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
