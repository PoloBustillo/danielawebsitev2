import { getBio } from "@/lib/api";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Bio = async () => {
  const bioData = (await getBio()) as any;

  return (
    <Card
      isBlurred
      className="border-none bg-[#37354b]  dark:bg-default-100/50  min-h-[650px] m-4 pt-3 "
      //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
    >
      <CardBody className="flex flex-col my-3 justify-center">
        <div className="flex  justify-center">
          <div className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] dark:from-yellow-200 dark:via-red-500 dark:to-fuchsia-500 relative inline-flex items-center justify-center  h-[30-vh] text-gray-900  animate-morphdiv">
            <div className="p-2">
              <Avatar
                radius="full"
                color="secondary"
                src={bioData.image}
                title="Psicologa Daniela Diaz"
                className="w-[25vh] h-[25vh] text-large "
              />
            </div>
          </div>
        </div>
        <p className="flex  justify-center text-medium text-[whitesmoke] font-extrabold leading-8">
          Psicóloga Daniela Diaz Merino
        </p>

        <div className="flex mt-10 lg:px-12  w-full flex-row items-center justify-center">
          <div className="animate-border inline-block rounded-md bg-foreground bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
            <span className="block rounded-md leading-8 p-1 dark:bg-[#1B1B1B] bg-[#37354b] px-5 py-3 justify-center text-center text-small text-[whitesmoke] text-white">
              <Markdown rehypePlugins={[rehypeRaw]}>
                {bioData.shortDescription}
              </Markdown>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Bio;
