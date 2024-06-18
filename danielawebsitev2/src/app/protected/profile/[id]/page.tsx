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
  DateInput,
  DateValue,
} from "@nextui-org/react";
import { SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDropzone } from "react-dropzone";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
// @ts-ignore
import dobToAge from "dob-to-age";
import { getFile, saveAvatarImageToStorage, saveImageForUser } from "@/lib/api";
import { firebase } from "@/auth";

const page = () => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const [date, setDate] = useState(null as DateValue | null);
  const xs = useMediaQuery({ query: "(max-width: 640px)" });
  const [selected, setSelected] = useState("settings");
  const [imageAvatar, setImageAvatar] = useState(session?.user?.image!);
  const [formData, setFormData] = useState({
    name: "",
    celular: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    edad: "",
    sexo: "",
    religion: "",
    ocupacion: "",
    escolaridad: "",
    image: {},
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    let user = { ...session?.user, ...formData };
    if (formData.image) {
      let imagePath = await saveAvatarImageToStorage(
        formData.image,
        session?.user?.id!
      );
      let imageUrl = await getFile(imagePath);
      saveImageForUser(session?.user?.id!, imageUrl);
      console.log("IAMGE", imageUrl);
      user = { ...user, image: imageUrl };
    }
    console.log(user);
    sessionUpdate({ ...session, user: { ...user } });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      let files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFormData((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setImageAvatar(files[0].preview);
    },
  });
  console.log("SESSION", session);
  useEffect(() => {
    if (session?.user && status == "authenticated") {
      setFormData({
        ...formData,
        name: session?.user?.name!,
        celular: session?.user?.celular!,
        image: session?.user?.image!,
      });
      if (session.user.fechaNacimiento) {
        console.log(session.user.fechaNacimiento);
        setDate(parseDate(session?.user?.fechaNacimiento!));
      }
      setImageAvatar(session?.user?.image!);
    }
  }, [session]);

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
              <Button
                color="success"
                isIconOnly
                type="submit"
                className="text-center  absolute right-[5%] w-[10%] top-[5%] h-14"
                endContent={<SaveIcon className="w-8 h-8" />}
                onClick={handleSubmit}
              ></Button>
            </CardHeader>
            <CardBody className="pb-0 pt-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 align-middle justify-around content-center">
              <div className="grid justify-center h-36px">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-all w-32 h-32 text-large"
                  color="secondary"
                  name={session?.user?.name!}
                  src={imageAvatar}
                />
              </div>
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

                    <input {...getInputProps()} />

                    {/* <input id="dropzone-file" type="file" className="hidden" /> */}
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="my-4 p-4 w-70wv">
            <CardHeader className="pb-0 p-4 flex-col items-start">
              <h4 className="font-bold text-large">Mi Perfil:</h4>
              <small className="text-default-500">
                {`ID:${session?.user?.id!}`}
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-4">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-col-1 sm:grid-cols-2 gap-4 content-center">
                  <div>
                    <p className="text-tiny uppercase font-bold">Email</p>
                    <Input
                      type="email"
                      name="email"
                      color="primary"
                      disabled={true}
                      variant="flat"
                      value={session?.user?.email!}
                      onChange={handleChange}
                      placeholder="Introduzca su email"
                      className=" md:w-[30vw] w-[100%]"
                      // isInvalid={errors?.email ? true : false}
                      // color={errors?.email ? "danger" : "default"}
                      // errorMessage={errors?.email?.message}
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Nombre</p>
                    <Input
                      isClearable
                      type="text"
                      variant="bordered"
                      placeholder="Introduzca su nombre"
                      className=" w-[30vw]"
                      name="name"
                      color="secondary"
                      onClear={() => {
                        setFormData({ ...formData, name: "" });
                      }}
                      value={formData.name}
                      onChange={handleChange}
                      // isInvalid={errors?.name ? true : false}
                      // color={errors?.name ? "danger" : "default"}
                      // errorMessage={errors?.name?.message}
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Apellido Paterno
                    </p>
                    <Input
                      isClearable
                      type="text"
                      variant="bordered"
                      placeholder="Introduzca su apelllido paterno"
                      defaultValue=""
                      onClear={() =>
                        setFormData({ ...formData, apellidoPaterno: "" })
                      }
                      className=" w-[30vw]"
                      name="apellidoPaterno"
                      color="secondary"
                      value={formData.apellidoPaterno}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Apellido Materno
                    </p>
                    <Input
                      isClearable
                      type="text"
                      variant="bordered"
                      placeholder="Introduzca su apelllido materno"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                      name="apellidoMaterno"
                      color="secondary"
                      value={formData.apellidoMaterno}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Teléfono Celular
                    </p>
                    <Input
                      isClearable
                      type="text"
                      variant="bordered"
                      placeholder="Introduzca su número de telefono"
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
                      name="celular"
                      color="secondary"
                      value={formData.celular}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      Fecha de nacimiento:
                    </p>
                    <DateInput
                      name="fechaNacimiento"
                      maxValue={today(getLocalTimeZone()).subtract({
                        days: 2000,
                      })}
                      value={date}
                      onChange={setDate}
                      variant="bordered"
                      className=" w-[30vw]"
                    />
                  </div>
                  <div>
                    <p className="text-tiny uppercase font-bold">Edad:</p>
                    <Input
                      disabled={true}
                      type="text"
                      color="primary"
                      variant="flat"
                      placeholder="Introduzca su edad"
                      value={date != null ? dobToAge(date) : "N/A"}
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
        <Tab key="preferences" title="Preferencias">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="account" title="Cuenta y Reportes">
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
