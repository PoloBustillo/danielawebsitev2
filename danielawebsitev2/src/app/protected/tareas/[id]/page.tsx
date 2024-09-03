"use client";

import { getTarea, saveTareasToStorage } from "@/lib/api";
import { TareasType } from "@/lib/types";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { BetweenHorizontalStartIcon, LetterText, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";

interface FileWithPreview extends FileWithPath {
  preview: string;
}

const page = ({ params: { id } }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});

  const [tarea, setTarea] = useState<TareasType>();
  const router = useRouter();
  const [touched, setTouched] = useState<boolean>(false);
  const [archivoClicked, setArchivoClicked] = useState<string>("");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { data: session, status, update: sessionUpdate } = useSession();
  console.log("🚀 ~ page ~ getValues:", getValues());

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) return;
      let userId = session?.user?.id;

      let collectionUser = collection(db, "users");
      const queryRespuestas = query(
        collectionUser,
        where("tareas.tarea", "==", doc(db, "tareas", id))
      );
      const docSnap = await getDocs(queryRespuestas);
      docSnap.forEach((doc) => {
        console.log("🚀 ~ docSnap.forEach ~ doc.data()", doc.data);
      });

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

  useEffect(() => {
    (async () => {
      let respuestasCollection = collection(db, "respuestas");
      const queryRespuestas = query(
        respuestasCollection,
        where("tarea", "==", doc(db, "tareas", id))
      );
      const docSnap = await getDocs(queryRespuestas);
      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          if (doc.data().data)
            doc.data().data.forEach((data: any) => {
              setValue(data.nombre, data.respuesta);
            });
        });
      }
    })();
  }, [tarea]);

  const {
    getRootProps,
    getInputProps,
    open: dragOpen,
    acceptedFiles,
    rootRef,
  } = useDropzone({
    accept: {},
    onDrop: (acceptedFiles, fileRejection, event) => {
      let files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];
      console.log("🚀 ~ onDrop ~ files", files);

      setFiles(files);
    },
  });
  const submitForm = async (data: any) => {
    let arrayOfObjects: {
      nombre: string;
      respuesta?: string;
      archivos?: any;
    }[] = Object.entries(data).map(([key, value]) => ({
      nombre: key,
      respuesta: value as string,
    }));
    arrayOfObjects = arrayOfObjects.filter((obj) => obj.respuesta != undefined);

    if (files.length > 0) {
      let filesStrings = await Promise.all(
        files.map(async (file) => {
          if (file.preview != undefined) {
            let filePath = await saveTareasToStorage(
              file,
              session?.user?.id! + file.path
            );
            return filePath;
          }
        })
      );
      console.log("🚀 ~ filesStrings:", filesStrings);
      console.log("🚀 ~ archivoClicked:", archivoClicked);
      filesStrings = filesStrings.filter((file) => file != undefined);
      if (filesStrings.length > 0)
        arrayOfObjects.push({
          nombre: archivoClicked,
          archivos: filesStrings!,
        });
    }

    const queryRespuestas = query(
      collection(db, "respuestas"),
      where("tarea", "==", doc(db, "tareas", id))
    );
    const docSnap = await getDocs(queryRespuestas);
    if (docSnap.empty) {
      let respuesta = await addDoc(collection(db, "respuestas"), {
        data: arrayOfObjects,
        tarea: doc(db, "tareas", id),
        user: doc(db, "users", session?.user.id!),
      });
    } else {
      updateDoc(docSnap.docs[0].ref, { data: arrayOfObjects });
    }
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
            color={!touched && files.length == 0 ? "default" : "success"}
            form="form-task"
            type="submit"
            isDisabled={files.length == 0 && !touched}
            startContent={<Save className="w-8 h-8" />}
          >
            Guardar cambios
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
            <form id="form-task" onSubmit={handleFormSubmit(submitForm)}>
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
                          {...register(subType.value)}
                          onChange={(e) => {
                            setTouched(true);
                          }}
                          variant="bordered"
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
                          <div
                            {...getRootProps({
                              className: "dropzone",
                              onClick: () => {
                                setArchivoClicked(subType.value);
                              },
                            })}
                          >
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
            </form>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default page;
