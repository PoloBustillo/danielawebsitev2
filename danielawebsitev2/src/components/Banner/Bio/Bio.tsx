import { getBio } from "@/lib/api";
import { InstitutionType } from "@/lib/types";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const Bio = async () => {
  const bioData = (await getBio()) as InstitutionType;

  return (
    <Card
      isBlurred
      className="border-none bg-[#37354b]  dark:bg-default-100/50  min-h-[650px] mx-10 mb-5 p-3 "
      //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
    >
      <CardBody className="flex flex-col justify-center my-3">
        <div className="flex justify-center">
          <div
            className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))]
              dark:from-yellow-200 dark:via-red-500 dark:to-fuchsia-500 
              relative inline-flex items-center justify-center 
              h-[30-vh] text-gray-900 animate-morphdiv"
          >
            <div className="p-8">
              <Avatar
                radius="full"
                color="secondary"
                src={bioData.image}
                title="Psicologa Daniela Diaz"
                className="w-[40vw] h-[40vw] sm:w-[30vh] sm:h-[30vh] text-large "
              />
            </div>
          </div>
        </div>
        <p className="flex  justify-center text-4xl mt-4 text-[whitesmoke]  leading-8 font-italliano">
          Psicóloga Daniela Diaz Merino
        </p>

        <div className="flex flex-row items-center justify-center w-full mt-10 lg:px-12">
          <div className="animate-border inline-block rounded-md bg-foreground bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
            <span className="block rounded-md leading-8 p-1 dark:bg-[#1B1B1B] bg-[#37354b] px-5 py-3 justify-center text-center text-small text-[whitesmoke]">
              <Markdown rehypePlugins={[rehypeRaw, remarkGfm]}>
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
