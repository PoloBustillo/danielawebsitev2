import { Link } from "@nextui-org/react";
import React from "react";

const Faq = () => {
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
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
              Ex orci laoreet egestas sapien magna egestas scelerisque?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam
              taciti at adipiscing est.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg" open>
            <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
              Lorem at arcu rutrum viverra metus sapien venenatis lobortis odio?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna
              porttitor egestas tincidunt neque vehicula potenti.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
              Eleifend feugiat sollicitudin laoreet adipiscing bibendum suscipit
              erat?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Justo libero tellus integer tincidunt justo semper consequat
              venenatis aliquet imperdiet. Ultricies urna proin fusce nulla
              pretium sodales vel magna et massa euismod vulputate sed.{" "}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
Faq.theme = "dark";
export default Faq;
