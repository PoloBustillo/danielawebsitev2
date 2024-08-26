import Comments from "@/components/Comments/Comments";
import Buttons from "@/components/Share/Buttons";
import Views from "@/components/Views/Views";
import getURL, { getBlog, getFile, getTerapia } from "@/lib/api";
import { BlogArticleType, TerapiaType } from "@/lib/types";
import { Image } from "@nextui-org/react";
import { DocumentReference, getDoc } from "firebase/firestore";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const page = async ({ params }: { params: any }) => {
  const blogData = (await getBlog(params.id)) as BlogArticleType;

  return (
    <article className="bg-yellow max-w-3xl px-6  mx-auto space-y-12  dark:text-white">
      <div className="bg-background max-w-4xl px-6 pt-16 mx-auto space-y-12">
        <div className="bg-background  w-full mx-auto space-y-4 text-center">
          <p className="text-xs font-semibold tracking-wider uppercase">
            {blogData.tags?.map((tag) => {
              return `#${tag} •`;
            })}
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {blogData.name}
          </h1>
          <p className="text-sm dark:text-gray-600">
            by
            <p className="flex justify-center underline dark:text-white">
              <span itemProp="name">{blogData.autor}</span>
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
            <Views
              views={blogData.views!}
              created={blogData.created_on!?.toDate().toLocaleDateString()}
              blogId={blogData.id}
            ></Views>
          </div>
        </div>

        <div className="flex flex-col max-w-5xl my-0 mx-auto overflow-hidden rounded">
          <img
            src={blogData.header_image}
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 w-full sm:w-auto m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-[#0b3d64e8] dark:bg-[#111827]">
            <div className="space-y-2">
              <blockquote className="relative text-center max-w-lg mx-auto pt-6">
                <div className="relative z-10">
                  <p className="text-xl text-gray-700">
                    <em className="relative">
                      <div className="relative z-10 text-white dark:text-white">
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
                        <Markdown
                          className="relative z-10 text-white dark:text-white"
                          rehypePlugins={[rehypeRaw, remarkGfm]}
                        >
                          {blogData.resumen}
                        </Markdown>
                      </div>
                    </em>
                  </p>
                </div>
              </blockquote>
              <div className="flex justify-center pt-4 space-x-4 align-center">
                <Buttons enableCita={false} pageUrl={params.id}></Buttons>
              </div>
            </div>
            <div className="text-white text-justify">
              {blogData.content?.map(async (content, index) => {
                if (content.type == "text")
                  return (
                    <Markdown
                      rehypePlugins={[rehypeRaw, remarkGfm]}
                      key={index}
                    >
                      {content.value}
                    </Markdown>
                  );
                if (content.type == "image") {
                  let image = await getFile(content.value.image);
                  return (
                    <figure className="py-6 w-[60%] m-auto">
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={image}
                        alt="image description"
                      />
                      <figcaption className="mt-2 text-sm text-center text-white dark:text-gray-400">
                        {content.value.caption}
                      </figcaption>
                    </figure>
                  );
                }
                if (content.type == "terapias") {
                  return content.value.map(
                    async (terapiaDoc: DocumentReference) => {
                      const terapia = (
                        await getDoc(terapiaDoc)
                      ).data() as TerapiaType;
                      let image = await getFile(terapia.imageBanner!);
                      return (
                        <div className="m-8">
                          <a
                            href={getURL(
                              `terapia/${encodeURIComponent(terapia.name!)}`
                            )}
                            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <img
                              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                              src={image}
                              alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                              <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                                {terapia.name}
                              </h5>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {terapia.description}
                              </p>
                            </div>
                          </a>
                        </div>
                      );
                    }
                  );
                }
                if (content.type == "quote")
                  return (
                    <blockquote className="border-l-4 border-gray-500 italic my-8 pl-4 md:pl-8 py-4 mx-4 md:mx-10 max-w-md">
                      <p className="text-lg font-medium">
                        {content.value.text}
                      </p>
                      <cite className="block text-right mt-4 text-white">
                        {`- ${content.value.autor}`}
                      </cite>
                    </blockquote>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
      <Comments blogId={blogData.id}></Comments>
    </article>
  );
};

export default page;
