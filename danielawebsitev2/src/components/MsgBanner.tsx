import { getMensajes } from "@/lib/api";
import { MensajesResponseType } from "@/lib/types";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MsgBanner = async () => {
  const { mensaje }: MensajesResponseType = await getMensajes();

  return (
    <>
      {mensaje?.enable ? (
        <div className="bg-purple px-4 py-3 text-slate-300 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] dark:from-yellow-200 dark:via-red-500 dark:to-fuchsia-500">
          <Markdown
            className="text-center dark:text-slate-800 text-sm font-medium"
            rehypePlugins={[rehypeRaw]}
          >
            {mensaje.message!}
          </Markdown>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MsgBanner;
