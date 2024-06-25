import Buttons from "@/components/Share/Buttons";
import { getTerapia, getTerapias } from "@/lib/api";
import { TerapiaType, TerapiasResponseType } from "@/lib/types";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const terapia = (await getTerapia(id)) as TerapiaType;

  return (
    <div className="max-w-3xl px-6 py-16 mx-auto space-y-12">
      <article className="space-y-8 ">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracki md:text-5xl">
            {terapia.name}
          </h1>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
            <div className="flex items-center md:space-x-2">
              <Image
                src="/assets/logo/logo500.webp"
                width={30}
                height={30}
                alt="logo"
                className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
              <p className="text-sm">{`Psic. Daniela Diaz • ${terapia.type}`}</p>
            </div>
            <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
              {`${terapia.duration} min  • $${terapia.costos[0].values} pesos`}
            </p>
          </div>
        </div>

        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src={terapia.imageDescription!}
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-[#37354b] dark:bg-[#1c1c1c]">
            <div className="space-y-2">
              <span className="inline-block text-white text-xl font-semibold sm:text-2xl">
                {terapia.description}
              </span>
              <Buttons pageUrl={id}></Buttons>
            </div>
            <div className="text-white text-justify">
              <Markdown rehypePlugins={[rehypeRaw, remarkGfm]}>
                {terapia.longDescription}
              </Markdown>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export async function generateStaticParams() {
  const areasTerapias: TerapiasResponseType =
    (await getTerapias()) as TerapiasResponseType;
  let terapias = Object.keys(areasTerapias)
    .map((key) => areasTerapias[key])
    .flat();
  return terapias.map((terapia) => {
    return { id: encodeURIComponent(terapia.name!) };
  });
}

export default page;
