import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const MsgBanner: React.FunctionComponent<{
  messageData: string;
}> = ({ messageData }: { messageData: string }) => {
  return (
    <div className="md:animate-none animate-hideMe bg-purple px-4 py-3 text-slate-100 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] dark:from-yellow-200 dark:via-red-500 dark:to-fuchsia-500">
      <Markdown
        className="text-center dark:text-slate-800 text-sm font-medium"
        rehypePlugins={[rehypeRaw]}
      >
        {messageData}
      </Markdown>
    </div>
  );
};
