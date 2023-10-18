import Banner from "@/components/Banner/Banner";

import React from "react";
import { getMensajes } from "../lib/api";
import { MensajesResponse } from "@/lib/types";

const page = async () => {
  const { frase, lema, mensaje }: MensajesResponse = await getMensajes();
  return (
    <main>
      <Banner lema={lema} frase={frase} />
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"
      >
        <img
          src="/gradients/docs-left.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs left background"
          data-loaded="true"
        />
      </div>
    </main>
  );
};

export default page;
