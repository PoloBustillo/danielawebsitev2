"use client";
import { getBlogs, getBlogsData } from "@/lib/api";
import { BlogArticleType, BlogDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [selected, setSelected] = useState<string>("ultimos");
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogDataType>({
    video: { url: "", msg: "" },
  });
  const [blogsData, setBlogsData] = useState<BlogArticleType[] | []>([]);

  useEffect(() => {
    (async () => {
      const blogs = (await getBlogs()) as BlogArticleType[];
      const data = (await getBlogsData()) as BlogDataType;
      setBlogs(data);
      setBlogsData(blogs);
    })();
  }, []);

  return (
    <div>
      <section className="px-5 py-10 bg-background">
        <div className="container justify-center items-center grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
          <div className="relative w-full col-span-12 bg-center bg-no-repeat bg-cover  xl:col-span-8 lg:col-span-8 md:col-span-12 min-h-96">
            <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-6 top-6 border-white text-white dark:border-rose-400 dark:text-gray-100">
              Puebla, Mexico
            </span>
            <div className="flex mt-4 flex-col items-center justify-end p-6 text-center sm:p-8 group dark:via-transparent flex-grow-1 bg-gradient-to-b from-gray-900 to-gray-900">
              <iframe
                className="mt-4 h-min-[500px] sm:mt-0 h-72 lg:h-96 xl:h-96"
                width="100%"
                height="100%"
                src={blogs?.video?.url}
                title="¿Por qué es importante ir al psicólogo?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
              <span className="flex items-center mb-4 space-x-2 text-yellow-100 dark:text-rose-400">
                <span className="relative flex-shrink-0 w-2 h-2 rounded-full bg-yellow-50 dark:bg-rose-400">
                  <span className="absolute flex-shrink-0 w-3 h-3 rounded-full -left-1 -top-1 animate-ping bg-white dark:bg-rose-400"></span>
                </span>
                <span className="text-sm font-bold">Live</span>
              </span>
              <h1
                rel="noopener noreferrer"
                className="font-serif text-2xl font-semibold group-hover:underline text-white dark:text-gray-100"
              >
                {blogs.video.msg}
              </h1>
            </div>
          </div>
          <div className="hidden py-2 xl:col-span-4 lg:col-span-4 md:hidden lg:block self-start">
            <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-rose-400">
              <button
                type="button"
                onClick={() => {
                  setSelected("ultimos");
                }}
                className={cn(
                  "pb-5 text-xs font-bold uppercase  dark:border-rose-400",
                  selected == "ultimos" ? "italic text-pink border-b-2" : ""
                )}
              >
                Ultimos
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelected("populares");
                }}
                className={cn(
                  "pb-5 text-xs font-bold uppercase  dark:border-rose-400",
                  selected == "populares" ? "italic text-pink border-b-2" : ""
                )}
              >
                Populares
              </button>
            </div>
            <div className="flex flex-col divide-y divide-gray-700">
              {blogsData.map((blog, index) => {
                return (
                  <div className="flex px-1 py-4">
                    <a onClick={() => router.push(`/blogs/${blog.name}`)}>
                      <img
                        alt=""
                        className="cursor-pointer flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                        src={blog.card_image}
                      />
                    </a>
                    <div className="flex flex-col flex-grow">
                      <a
                        rel="noopener noreferrer"
                        onClick={() => router.push(`/blogs/${blog.name}`)}
                        className="cursor-pointer font-serif hover:underline"
                      >
                        {blog.name}
                      </a>
                      <p className="mt-auto text-xs dark:text-gray-400">
                        {blog.created_on
                          ? blog.created_on.toDate().toLocaleDateString()
                          : "hace 5 minutos"}
                        <a
                          rel="noopener noreferrer"
                          href="#"
                          className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                        >
                          {blog?.tags![0] ? blog.tags[0] : "Psicología"}
                        </a>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Articulos para ti</h2>
            <p className="font-serif text-sm dark:text-gray-400">
              Seleccionamos estos articulos para apoyar al máximo tu terapia y
              tus gustos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {blogsData.map((data: BlogArticleType) => {
              return (
                <article className="flex flex-col dark:bg-gray-900">
                  <a
                    rel="noopener noreferrer"
                    onClick={() => router.push(`/blogs/${data.name}`)}
                  >
                    <img
                      alt=""
                      className="object-cover w-full h-52 dark:bg-gray-500"
                      src={data.card_image}
                    />
                  </a>
                  <div className="flex flex-col flex-1 p-6">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      aria-label="Te nulla oportere reprimique his dolorum"
                    ></a>
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs tracki uppercase hover:underline dark:text-violet-400"
                    >
                      {data.tags![0] ? data.tags![0] : "Psicología"}
                    </a>
                    <h3
                      onClick={() => router.push(`/blogs/${data.name}`)}
                      className="cursor-pointer flex-1 py-2 text-lg font-semibold leadi"
                    >
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
      </section>
    </div>
  );
};

export default Blogs;
