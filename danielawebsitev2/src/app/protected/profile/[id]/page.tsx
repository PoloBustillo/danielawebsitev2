"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  RadioGroup,
  Checkbox,
  Chip,
} from "@nextui-org/react";
import { Rss, SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CustomRadio } from "@/components/CustomRadio/CustomRadio";
import { cn } from "@/lib/utils";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

const page = () => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const xs = useMediaQuery({ query: "(max-width: 640px)" });
  const [selected, setSelected] = useState("settings");

  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="m-auto p-8 flex justify-evenly">
      <Tabs
        aria-label="Configuraciones"
        isVertical={xs ? false : true}
        size="md"
        color="secondary"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        classNames={{
          tab: "md:w-[200px]",
          panel: "w-[70vw]",
        }}
      >
        <Tab key="settings" title="Perfil">
          <ProfileCard></ProfileCard>
        </Tab>
        <Tab key="preferences" title="Preferencias">
          <Card className="my-4 p-4 w-70wv">
            <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
              <h4 className="font-bold text-large">Preferencias:</h4>
              <small className="text-default-500">{`ID:${session?.user?.id}`}</small>
            </CardHeader>
            <CardBody className="pb-0 pt-2 p-4 grid grid-cols-1 gap-4 align-middle justify-around content-center">
              <div className="grid grid-cols-2 gap-20 p-6">
                <Checkbox
                  aria-label={"notificaciones"}
                  classNames={{
                    base: cn(
                      "inline-flex w-full max-w-md bg-content1",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                    label: "w-full",
                  }}
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                >
                  <div className="w-full flex justify-between">
                    <span>
                      <Rss /> Subscripcion al blog
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-tiny text-default-500">
                        Recibe notificaciones de nuevos post.
                      </span>
                      <Chip color="success" size="sm" variant="flat">
                        Habilitado
                      </Chip>
                    </div>
                  </div>
                </Checkbox>
                <Checkbox
                  aria-label={"notificaciones"}
                  classNames={{
                    base: cn(
                      "inline-flex w-full max-w-md bg-content1",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                    label: "w-full",
                  }}
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                >
                  <div className="w-full flex justify-between">
                    <span>
                      <Rss /> Subscripcion al blog
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-tiny text-default-500">
                        Recibe notificaciones de nuevos post.
                      </span>
                      <Chip color="success" size="sm" variant="flat">
                        Habilitado
                      </Chip>
                    </div>
                  </div>
                </Checkbox>
                <Checkbox
                  aria-label={"notificaciones"}
                  classNames={{
                    base: cn(
                      "inline-flex w-full max-w-md bg-content1",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                    label: "w-full",
                  }}
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                >
                  <div className="w-full flex justify-between">
                    <span>
                      <Rss /> Subscripcion al blog
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-tiny text-default-500">
                        Recibe notificaciones de nuevos post.
                      </span>
                      <Chip color="success" size="sm" variant="flat">
                        Habilitado
                      </Chip>
                    </div>
                  </div>
                </Checkbox>
                <Checkbox
                  aria-label={"notificaciones"}
                  classNames={{
                    base: cn(
                      "inline-flex w-full max-w-md bg-content1",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                    label: "w-full",
                  }}
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                >
                  <div className="w-full flex justify-between">
                    <span>
                      <Rss /> Subscripcion al blog
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-tiny text-default-500">
                        Recibe notificaciones de nuevos post.
                      </span>
                      <Chip color="success" size="sm" variant="flat">
                        Habilitado
                      </Chip>
                    </div>
                  </div>
                </Checkbox>
              </div>
              <RadioGroup
                label="Notificaciones"
                className="w-full"
                description="Selecciona por que medio te gustaría recibir notificaciones."
              >
                <CustomRadio
                  description="Correo electrónico, usando el correo principal del perfil."
                  value="email"
                >
                  Email
                </CustomRadio>
                <CustomRadio
                  description="Notificaciones en la aplicación de mensajería Whatsapp."
                  value="whatsapp"
                >
                  Whatsapp
                </CustomRadio>
                <CustomRadio
                  description="Se notificará por medio de una llamada telefónica."
                  value="llamada"
                >
                  Llamada
                </CustomRadio>
              </RadioGroup>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="account" title="Cuenta">
          <Card className="my-4 p-4 w-70wv">
            <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
              <h4 className="font-bold text-large">Mi Foto:</h4>
              <small className="text-default-500">{`ID:${session?.user?.id}`}</small>
              <Button
                color="success"
                isIconOnly
                type="submit"
                className="text-center  absolute right-[5%] w-[10%] top-[5%] h-14"
                endContent={<SaveIcon className="w-8 h-8" />}
              ></Button>
            </CardHeader>
            <CardBody className="pb-0 pt-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 align-middle justify-around content-center">
              <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
                <div className="flex flex-col items-center w-full">
                  <h2 className="text-3xl font-semibold text-center">
                    Your opinion matters!
                  </h2>
                  <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-center">
                      How was your experience?
                    </span>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        title="Rate 1 stars"
                        aria-label="Rate 1 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-10 h-10 text-yellow-500 dark:text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 2 stars"
                        aria-label="Rate 2 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-10 h-10 text-yellow-500 dark:text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 3 stars"
                        aria-label="Rate 3 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-10 h-10 text-yellow-500 dark:text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 4 stars"
                        aria-label="Rate 4 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-10 h-10 text-yellow-500 dark:text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 5 stars"
                        aria-label="Rate 5 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-10 h-10 text-gray-600 dark:text-gray-400"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <textarea
                      rows={3}
                      placeholder="Message..."
                      className="p-4 rounded-md resize-none text-gray-100 dark:text-gray-800 bg-gray-900 dark:bg-gray-50"
                    ></textarea>
                    <button
                      type="button"
                      className="py-4 my-8 font-semibold rounded-md text-gray-900 dark:text-gray-50 bg-violet-400 dark:bg-violet-600"
                    >
                      Leave feedback
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-sm text-gray-400 dark:text-gray-600"
                  >
                    Maybe later
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default page;
