"use client";

import {
  getTarea,
  saveAvatarImageToStorage,
  saveTareasToStorage,
} from "@/lib/api";
import { TareasType } from "@/lib/types";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {
  BetweenHorizontalStartIcon,
  LetterText,
  ListEnd,
  Save,
} from "lucide-react";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";

interface FileWithPreview extends FileWithPath {
  preview: string;
}

const page = ({ params: { id } }: { params: { id: string } }) => {
  const [tarea, setTarea] = useState<TareasType>();
  const router = useRouter();
  const [touched, setTouched] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { data: session, status, update: sessionUpdate } = useSession();

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) router.push("/protected/tareas");
      let userId = session?.user?.id;
      let userData = (await getDoc(doc(db, "users", userId!))).data();
      if (!userData?.tareas) router.push("/protected/tareas");
      let findTareaForUser = userData?.tareas.find((tarea: any) => {
        return tarea.tarea.id == id;
      });
      if (!findTareaForUser) router.push("/protected/tareas");
      const fetchedTarea = (await getTarea(id)) as TareasType;
      setTarea(fetchedTarea);
    })();
  }, [session]);

  const {
    getRootProps,
    getInputProps,
    open: dragOpen,
    acceptedFiles,
  } = useDropzone({
    accept: {},
    onDrop: (acceptedFiles) => {
      let files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];
      setFiles(files);
    },
  });

  const handleSubmit = async () => {
    let filesStrings = await Promise.all(
      files.map(async (file) => {
        if (file.preview != undefined) {
          let filePath = await saveTareasToStorage(
            file,
            session?.user?.id! + file.path
          );
          return filePath;
        }

        //   let user = { ...session?.user };
        //   let imagePath = await saveAvatarImageToStorage(
        //     file.,
        //     session?.user?.id!
        //   );
        // }
      })
    );
    setTouched(true);
    console.log("🚀 ~ handleSubmit ~ filesStrings:", filesStrings);

    // if ((imageAvatar as File).name != undefined) {
    //   let user = { ...session?.user };
    //   let imagePath = await saveAvatarImageToStorage(

    //     imageAvatar,
    //     session?.user?.id!
    //   );
    //   let imageUrl = await getFile(imagePath);
    //   setImageAvatarURL(imageUrl);
    //   saveImageForUser(session?.user?.id!, imageUrl);
    //   user = { ...user, image: imageUrl };
    //   await sessionUpdate({
    //     user: {
    //       ...session?.user!,
    //       image: imageUrl,
    //     },
    //   });
    //   setTouched(false);
    //   setImageAvatar(undefined);
    // }
  };
  return (
    <Card className="m-8 sm:m-20 p-4">
      <CardHeader className="pb-0 py-2 p-4 flex-col sm:flex-row content-between justify-between">
        <div>
          <h4 className="font-bold text-large">{tarea?.name}</h4>
          <small className="text-default-500">{`ID: ${tarea?.id}`}</small>
        </div>
        <div className="text-center">
          <Button
            color={!touched ? "default" : "success"}
            type="submit"
            isDisabled={!touched}
            startContent={<Save className="w-8 h-8" />}
            onClick={handleSubmit}
          >
            Entregar tarea
          </Button>
        </div>
      </CardHeader>
      <CardBody className="pb-0 pt-2 p-4 align-middle justify-around content-center">
        <div>
          <h1 className="m-4 text-justify">
            <Markdown
              className="relative z-10  "
              rehypePlugins={[rehypeRaw, remarkGfm]}
            >
              {tarea?.explicacion}
            </Markdown>
          </h1>
        </div>
        {tarea?.type!.map((section) => {
          return (
            <Card className="pb-0 pt-2 my-4 p-4 align-middle justify-around content-center">
              <h1 className="text-lg">{section.name}</h1>
              <Accordion variant="light">
                <AccordionItem
                  key="1"
                  aria-label="Explicación"
                  startContent={
                    <Button isIconOnly color="danger" aria-label="Like">
                      <BetweenHorizontalStartIcon />
                    </Button>
                  }
                  subtitle="lee y si tienes dudas contactame"
                  title="Pasos a seguir"
                >
                  <Markdown
                    className="relative z-10  text-justify"
                    rehypePlugins={[rehypeRaw, remarkGfm]}
                  >
                    {section.description}
                  </Markdown>
                </AccordionItem>
              </Accordion>
              {section.type &&
                section.type.map((subType: any) => {
                  if (subType.type == "text") {
                    return (
                      <Textarea
                        className="my-4"
                        variant="bordered"
                        onChange={(e) => {
                          setTouched(true);
                        }}
                        startContent={<LetterText />}
                        maxRows={10}
                        color="secondary"
                        label={subType.value}
                        placeholder={
                          "Escribe aquí tu respuesta siguiendo las instrucciones"
                        }
                      />
                    );
                  }
                  if (subType.type == "archivo") {
                    return (
                      <div className="grid">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <label className="flex flex-col items-center w-[100%] p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                              />
                            </svg>
                            <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                              Da click o arrastra tu archivo aquí.
                            </h2>
                            <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, GIF, PDF, WORD (MAX. 5MB)
                            </p>

                            <input {...getInputProps()} />
                          </label>
                          {files.length > 0 && (
                            <aside className="m-4">
                              <p className="bold text-medium">Archivo(s):</p>
                              <ul>
                                {files.map((file) => (
                                  <li key={file.name}>
                                    {file.name} - {file.size} bytes
                                  </li>
                                ))}
                              </ul>
                            </aside>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
            </Card>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default page;
