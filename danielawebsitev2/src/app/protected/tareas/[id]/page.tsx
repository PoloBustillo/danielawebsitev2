"use client";

import { getFile, getTarea, saveTareasToStorage } from "@/lib/api";
import { TareasType } from "@/lib/types";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {
  BetweenHorizontalStartIcon,
  LetterText,
  Link,
  Save,
} from "lucide-react";
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
import Formulario from "@/components/Tarea/Formulario";

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
  } = useForm();

  const [tarea, setTarea] = useState<TareasType>();
  const [respuestaId, setRespuestaId] = useState<string>();
  const [tareaUsuarioId, setTareaUsuarioId] = useState<string>();
  const router = useRouter();
  const [archivoClicked, setArchivoClicked] = useState<string>("");
  const [dataFiles, setDataFiles] = useState<any[]>([]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { data: session, status, update: sessionUpdate } = useSession();

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) return;
      let userId = session?.user?.id;
      let tareasCollection = collection(db, "tareas-usuario-respuestas");
      const queryTareasUsuarios = query(
        tareasCollection,
        where("user", "==", doc(db, "users", userId)),
        where("tarea", "==", doc(db, "tareas", id))
      );
      let tareasDocs = await getDocs(queryTareasUsuarios);
      let findTareaForUser = tareasDocs.docs.find(
        (doc) => doc.data().tarea.id == id
      );
      if (!findTareaForUser) router.push("/protected/tareas");
      const fetchedTarea = (await getTarea(id)) as TareasType;

      setTarea(fetchedTarea);
    })();
  }, [session]);

  useEffect(() => {
    (async () => {
      let tareasCollection = collection(db, "tareas-usuario-respuestas");
      const queryTareasUsuarios = query(
        tareasCollection,
        where("tarea", "==", doc(db, "tareas", id)),
        where("user", "==", doc(db, "users", session?.user?.id!))
      );
      const docSnap = await getDocs(queryTareasUsuarios);
      setTareaUsuarioId(docSnap.docs[0].id);
      if (!docSnap.empty) {
        docSnap.forEach(async (doc) => {
          let docRespuesta = await getDoc(doc.data().respuesta);

          if ((docRespuesta.data() as { data?: any }).data) {
            setRespuestaId(docRespuesta.id);
            (docRespuesta.data() as { data: any[] }).data.forEach(
              (data: any) => {
                setValue(data.nombre, data.respuesta);
              }
            );
          }

          if ((docRespuesta.data() as { archivos?: any }).archivos) {
            let archivosData = (docRespuesta.data() as { archivos: any[] })
              .archivos;
            archivosData = await Promise.all(
              archivosData.map(async (dataArch) => {
                let data = await Promise.all(
                  dataArch.archivos.map(async (archivo: any) => {
                    let file = await getFile(archivo);
                    return { url: file, nombre: archivo };
                  })
                );

                return { ...dataArch, archivos: data };
              })
            );

            setDataFiles(archivosData);
            setRespuestaId(docRespuesta.id);
          }
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
    inputRef,
  } = useDropzone({
    onDrop: async (acceptedFiles, fileRejection, event) => {
      let files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];

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

      filesStrings = filesStrings.filter((file) => file != undefined);
      let data = {
        archivos: [
          {
            nombre: inputRef.current?.alt,
            archivos: filesStrings!,
          },
        ],
      };
      if (!respuestaId) {
        let document = await addDoc(collection(db, "respuestas"), data);
        await updateDoc(doc(db, "tareas-usuario-respuestas", tareaUsuarioId!), {
          respuesta: document,
        });
      } else {
        await updateDoc(doc(db, "respuestas", respuestaId!), data);
      }
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
    let dataToBeSend: any = { data: arrayOfObjects };
    if (!respuestaId) {
      let document = await addDoc(collection(db, "respuestas"), dataToBeSend);
      await updateDoc(doc(db, "tareas-usuario-respuestas", tareaUsuarioId!), {
        respuesta: document,
      });
    } else {
      await updateDoc(doc(db, "respuestas", respuestaId!), dataToBeSend);
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
            color={"success"}
            form="form-task"
            type="submit"
            startContent={<Save className="w-8 h-8" />}
          >
            Guardar cambios
          </Button>
        </div>
      </CardHeader>
      <CardBody className="pb-0 pt-2 p-4 align-middle justify-around content-center">
        {dataFiles.length > 0 && (
          <aside className="m-4">
            <p className="bold text-medium">Archivo(s) Cargados:</p>
            <ul>
              {dataFiles.map((file) => (
                <>
                  <span>{file.nombre}</span>
                  <ul key={file}>
                    {file.archivos.map((archivo: any) => (
                      <li key={archivo.nombre}>
                        <a href={archivo.url} className="text-blue-500">
                          {archivo.nombre}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </ul>
          </aside>
        )}
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
                    if (subType.type == "formulario") {
                      return <Formulario formularioDoc={subType.value} />;
                    }
                    if (subType.type == "link") {
                      return (
                        <>
                          <label className="block  text-md font-medium text-gray-900 dark:text-white">
                            {subType.value}
                          </label>
                          <div className="relative mb-6">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                              <Link></Link>{" "}
                            </div>
                            <input
                              {...register(subType.value)}
                              type="text"
                              id="input-group-1"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder={subType.value}
                            />
                          </div>
                        </>
                      );
                    }
                    if (subType.type == "text") {
                      return (
                        <>
                          <label className="block  text-md font-medium text-gray-900 dark:text-white">
                            {subType.value}
                          </label>
                          <textarea
                            {...register(subType.value)}
                            className="h-[200px] mb-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            // variant="bordered"
                            // startContent={<LetterText />}
                            // maxRows={10}
                            // color="secondary"
                            // label={subType.value}
                            placeholder={
                              "Escribe aquí tu respuesta siguiendo las instrucciones"
                            }
                          />
                        </>
                      );
                    }
                    if (subType.type == "archivo") {
                      return (
                        <div className="grid">
                          <div
                            {...getRootProps({
                              className: "dropzone",
                              alt: subType.value as string,
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

                              <input
                                {...getInputProps({
                                  alt: subType.value as string,
                                })}
                              />
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
