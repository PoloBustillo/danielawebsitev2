"use client";
import { UserProfile, profileSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { CameraIcon, SaveAllIcon, SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UserProfile>({ resolver: zodResolver(profileSchema) });
  const xs = useMediaQuery({ query: "(max-width: 640px)" });

  const onSubmit = (data: UserProfile) => {
    console.log(data);
  };
  const [selected, setSelected] = useState("settings");
  const { data: session, status } = useSession();

  return (
    <div className="m-auto p-8">
      <Tabs
        aria-label="Configuraciones"
        isVertical={xs ? false : true}
        size="md"
        color="secondary"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        classNames={{
          tab: "md:w-[200px]",
        }}
      >
        <Tab key="settings" title="Perfil de usuario">
          <Card className="my-4 p-4">
            <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
              <h4 className="font-bold text-large">Mi Foto:</h4>
              <small className="text-default-500">{`ID:${session?.user?.id}`}</small>

              {/* <Button
                color="success"
                isIconOnly
                type="submit"
                className="text-center  absolute right-[5%] w-[10%] top-[5%] h-14"
                endContent={<SaveIcon className="w-8 h-8" />}
                onPress={() => {
                  console.log("save");
                  handleSubmit(onSubmit);
                }}
              ></Button> */}
            </CardHeader>
            <CardBody className="pb-0 pt-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 align-middle justify-around content-center">
              <div className="grid justify-center h-36px">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-all w-32 h-32 text-large"
                  color="secondary"
                  name={session?.user?.name!}
                  src={session?.user?.image!}
                />
              </div>
              <div className="grid">
                <label className="flex flex-col items-center w-[100%] p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                    Da click o arrastra tu foto aquí.
                  </h2>
                  <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 5MB)
                  </p>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </CardBody>
          </Card>
          <Card className="my-4 p-4 w-70wv">
            <CardHeader className="pb-0 p-4 flex-col items-start">
              <h4 className="font-bold text-large">Mi Perfil:</h4>
              <small className="text-default-500">{`ID:${session?.user?.id}`}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("SUBMIT", errors, isValid, isDirty);
                  handleSubmit(onSubmit);
                }}
                className="w-full"
              >
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Guardar
                  </Button>
                </div>
                <div className="grid grid-col-1 sm:grid-cols-2 gap-4 content-center">
                  <div>
                    <p className="text-tiny uppercase font-bold">Email</p>
                    <Input
                      {...register("email")}
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su email"
                      className=" md:w-[30vw] w-[100%]"
                      isInvalid={errors?.email ? true : false}
                      color={errors?.email ? "danger" : "default"}
                      errorMessage={errors?.email?.message}
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Nombre</p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Apellido Paterno
                    </p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Apellido Materno
                    </p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Teléfono Celular
                    </p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Fecha de nacimiento:
                    </p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Edad:</p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Sexo:</p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Religión:</p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Ocupación:</p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Escolaridad:
                    </p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                    />
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default page;
