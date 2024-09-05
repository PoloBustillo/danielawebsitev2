import { BlogArticleType } from "@/lib/types";
import React from "react";

const BlogsSection = ({ blogs }: { blogs: BlogArticleType[] }) => {
  return (
    <div className="bg-background mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-14">
          Desde el blog
        </h2>
        <h2 className="text-3xl font-bold  tracking-tight sm:text-4xl"></h2>
        <p className=" text-center mt-2 text-lg leading-8 text-gray-600">
          Emociones en movimiento, artículos y reflexiones..
        </p>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((data) => {
            return (
              <article className="flex flex-col bg-[#d6297b] text-white dark:text-black">
                <a className="cursor-pointer" href={`/blogs/${data.name}`}>
                  <img
                    alt=""
                    className="object-cover w-full h-52 dark:bg-gray-500"
                    src={data.card_image}
                  />
                </a>
                <div className="flex flex-col flex-1 p-6">
                  <div className=" ">
                    {data.tags?.map((tag) => {
                      return (
                        <a
                          rel="noopener noreferrer"
                          href="#"
                          className=" text-xs tracki uppercase hover:underline dark:text-violet-400"
                        >
                          {` #${tag} • `}
                        </a>
                      );
                    })}
                  </div>

                  <h3 className="cursor-pointer flex-1 py-2 text-lg font-semibold leadi">
                    {data.name}
                  </h3>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                    <span>
                      {data.created_on
                        ? data.created_on.toDate().toLocaleDateString()
                        : "hace 5 minutos"}
                    </span>
                    <span>{`${data.views} vistas`}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
