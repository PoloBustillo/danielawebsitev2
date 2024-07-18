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
    <div className="max-w-4xl px-6 pt-16 -mb-6 mx-auto space-y-12">
      <article>
        <div className="w-full mx-auto space-y-4 text-center">
          <p className="text-xs font-semibold tracking-wider uppercase">
            {`#Terapias • #${terapia.type}`}
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {terapia.name}
          </h1>
          <p className="text-sm dark:text-gray-600">
            by
            <p className="flex justify-center underline dark:text-white">
              <span itemProp="name">Psic. Daniela Diaz</span>
            </p>
          </p>
        </div>
        <div className="relative bottom-3 sm:bottom-6">
          <div className="flex flex-row items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
            <div className="flex items-center md:space-x-2">
              <Image
                src="/assets/logo/logo500.webp"
                width={35}
                height={35}
                alt="logo"
                className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
              {/* <p className="text-sm">{`${terapia.name} • ${terapia.type}`}</p> */}
            </div>
            <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
              {`${terapia.duration} min  •`}
            </p>
          </div>
        </div>

        <div className="flex flex-col max-w-5xl my-0 mx-auto overflow-hidden rounded">
          <img
            src={terapia.imageDescription!}
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 w-full sm:w-auto m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-[#0b3d64e8] dark:bg-[#111827]">
            <div className="space-y-2">
              <blockquote className="relative text-center max-w-lg mx-auto pt-6">
                <div className="relative z-10">
                  <p className="text-xl text-gray-700">
                    <em className="relative">
                      <svg
                        className="absolute -top-8 -start-8 size-16 text-gray-100 sm:h-24 sm:w-24 dark:text-neutral-700"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                          fill="gray"
                        ></path>
                      </svg>
                      <span className="relative z-10 text-white dark:text-white">
                        {terapia.description}
                      </span>
                    </em>
                  </p>
                </div>
              </blockquote>
              <div className="flex justify-center pt-4 space-x-4 align-center">
                <Buttons pageUrl={id}></Buttons>
              </div>
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
