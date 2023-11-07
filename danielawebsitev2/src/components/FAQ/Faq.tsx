import { getPreguntas } from "@/lib/api";
import { PreguntasResponseType } from "@/lib/types";
import { Link } from "@nextui-org/react";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Faq = async () => {
  const preguntas = ((await getPreguntas()) as PreguntasResponseType[]).sort(
    (a, b) => a.orden - b.orden
  );
  console.log(preguntas);
  return (
    <section className="dark px-5 md:px-0  bg-[#37354b] dark:bg-background dark:text-foreground text-gray-100">
      <div className="container flex flex-col justify-center px-10 py-8 mx-auto md:p-20">
        <h1 className="text-4xl font-bold">Preguntas Frecuentes</h1>
        <p className="mt-4 mb-8 text-gray-400">
          Si tienes más preguntas no dudes en contactarme...{" "}
          <Link
            className="text-[#FDFDFD] text-md font-normal mb-6 space-links"
            showAnchorIcon
            href="/#contactame"
          >
            Aquí
          </Link>
        </p>
        <div className="space-y-4">
          {preguntas.map((pregunta) => (
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
                {pregunta.pregunta}
              </summary>

              <Markdown
                rehypePlugins={[rehypeRaw]}
                className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400"
              >
                {pregunta.respuesta}
              </Markdown>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
