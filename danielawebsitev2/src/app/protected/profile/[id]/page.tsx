"use client";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();
  return (
    <div className="m-auto p-8">
      <Tabs
        aria-label="Configuraciones"
        isVertical={true}
        classNames={{
          tab: "md:w-[200px]",
          panel: "ml-6 w-full",
        }}
      >
        <Tab key="photos" title="Perfil de usuario">
          <Card className="my-4 p-4">
            <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
              <h4 className="font-bold text-large">Mi Foto:</h4>
              <small className="text-default-500">{`ID:${session?.user?.id}`}</small>
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
              <form className="w-full">
                <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-tiny uppercase font-bold">Email</p>
                    <Input
                      isClearable
                      type="email"
                      variant="bordered"
                      placeholder="Introduzca su email"
                      defaultValue=""
                      onClear={() => console.log("input cleared")}
                      className=" w-[30vw]"
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
                      onClear={() => console.log("input cleared")}
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
      {/* <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-foreground top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold dark:text-white text-secondary-900">
            Configuraciones
          </h2>

          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
          >
            Pubic Profile
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Account Settings
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            Notifications
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            PRO Account
          </a>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8  sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>

            <div className="grid mx-auto mt-8">
              <div className="flex flex-col  items-center space-y-5 sm:flex-row sm:space-y-0 justify-around align-middle">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-all w-37 h-37 text-large"
                  color="secondary"
                  name={session?.user?.name!}
                  src={session?.user?.image!}
                />

                <div className="flex flex-col space-y-5 sm:ml-8">
                  <div>
                    <label className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
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
                        Click to upload or drag and drop
                      </h2>
                      <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 512x512px)
                      </p>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  >
                    Change picture
                  </button>
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  >
                    Delete picture
                  </button>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                      Your first name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your first name"
                      value="Jane"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                      Your last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your last name"
                      value="Ferguson"
                      required
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    required
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your profession"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Bio
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                    placeholder="Write your bio here..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main> */}
    </div>
  );
};

export default page;
