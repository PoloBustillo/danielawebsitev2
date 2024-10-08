import { getPreguntas } from "@/lib/api";
import { PreguntasResponseType } from "@/lib/types";
import { Link as LinkUI } from "@nextui-org/react";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Faq = async () => {
  const preguntas = ((await getPreguntas()) as PreguntasResponseType[]).sort(
    (a, b) => a.orden - b.orden
  );

  return (
    <section className="dark bg-[#37354b] dark:bg-background dark:text-foreground text-gray-100">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-7xl mt-4 sm:mt-20">
          <div className="container flex flex-col justify-center md:px-10 py-8 mx-auto md:p-20">
            <h1 className="text-4xl font-bold">Preguntas Frecuentes</h1>
            <p className="mt-4 mb-8 text-gray-400">
              Si tienes más preguntas no dudes en contactarme...{" "}
              <Link
                className="text-[#FDFDFD] text-md font-normal mb-6 space-links"
                href={"/#contactame"}
              >
                <LinkUI showAnchorIcon>Aquí</LinkUI>
              </Link>
            </p>
            <div className="space-y-4">
              {preguntas.map((pregunta) => (
                <details
                  key={pregunta.pregunta}
                  className="w-full border rounded-lg cursor-pointer"
                >
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
        </div>
      </div>
    </section>
  );
};

export default Faq;
