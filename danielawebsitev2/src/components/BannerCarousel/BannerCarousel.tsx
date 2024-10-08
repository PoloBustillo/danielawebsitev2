import { CarouselResponseType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
interface BannerProps {
  data: CarouselResponseType;
}
const BannerCarousel = ({ data }: BannerProps) => {
  if (data)
    return (
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="flex flex-col-reverse mx-auto lg:flex-row">
          <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 dark:bg-rose-400 dark:text-gray-900">
            <h1 className="mb-6 text-4xl font-bold">{data.title}</h1>
            <div className="flex flex-col space-x-2 sm:space-x-4">
              <Markdown rehypePlugins={[rehypeRaw, remarkGfm]}>
                {data.content}
              </Markdown>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-3/5 dark:bg-gray-800">
            <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
              <Image
                aria-label={data.title!}
                width={500}
                height={100}
                src={data.image!}
                alt={data.title!}
                className="rounded-lg shadow-lg dark:bg-gray-500 aspect-video sm:min-h-96"
              />
            </div>
          </div>
        </div>
      </section>
    );

  return <>Loading</>;
};

export default BannerCarousel;
