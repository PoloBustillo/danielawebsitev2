"use client";
import { Logo } from "@/components/icons/Logo";
import { db } from "@/lib/firebase-config";
import { Button, Divider, Input } from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data: session } = useSession();
  const [showTicket, setShowTicket] = useState<boolean>(false);
  const [servicio, setServicio] = useState("88");
  const [comfort, setComfort] = useState("88");
  const [wifi, setWifi] = useState("88");
  const [comodidades, setComodidades] = useState("88");
  const [espacio, setEspacio] = useState("88");
  const [limpieza, setLimpieza] = useState("88");
  const [locacion, setLocacion] = useState("88");
  const [ticket, setTicket] = useState("");
  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }

  useEffect(() => {
    setTicket(uuidv4());
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      const docRef = doc(db, "users", session?.user?.id!);

      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            setServicio(doc.data()?.reviews?.servicio);
            setComfort(doc.data()?.reviews?.comfort);
            setWifi(doc.data()?.reviews?.wifi);
            setComodidades(doc.data()?.reviews?.comodidades);
            setEspacio(doc.data()?.reviews?.espacio);
            setLimpieza(doc.data()?.reviews?.limpieza);
            setLocacion(doc.data()?.reviews?.locacion);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [session]);

  const saveToUserCollection = async () => {
    const docRef = doc(db, "users", session?.user?.id!);
    await updateDoc(docRef, {
      reviews: {
        servicio: Number(servicio),
        comfort: Number(comfort),
        wifi: Number(wifi),
        comodidades: Number(comodidades),
        espacio: Number(espacio),
        limpieza: Number(limpieza),
        locacion: Number(locacion),
      },
    });
  };

  const calculateAverage = () => {
    const average =
      (Number(servicio) +
        Number(comfort) +
        Number(wifi) +
        Number(comodidades) +
        Number(espacio) +
        Number(limpieza) +
        Number(locacion)) /
      7;
    if (isNaN(average)) return 88;
    return Number(average.toFixed(1));
  };
  return (
    <section className="relative flex flex-wrap lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold sm:text-4xl mb-4">
          ¿Necesitas ayuda?
        </h1>
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              Estamos aquí para ayudarte. Si tienes alguna pregunta o problema,
              crea un ticket y nuestro servicio técnico se contactará contigo.
            </p>
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                setShowTicket(true);
              }}
            >
              Crear ticket
            </Button>
          </div>
        </div>
        {showTicket && (
          <div className="my-4 bg-zinc-500 dark:bg-foreground relative drop-shadow-2xl rounded-3xl p-4 m-auto sm:w-[50%] md:w-[40%]">
            <div className="flex-none sm:flex text-white dark:text-black">
              <div className="flex-auto justify-evenly">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex-auto text-xs text-white dark:text-black my-1">
                      <span className="mr-1 ">F -</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                      TEC
                    </div>
                    <div className="text-xs">PUE</div>
                  </div>
                  <div className="flex flex-col mx-auto p-4">
                    <Logo></Logo>
                  </div>
                  <div className="flex flex-col text-white dark:text-black">
                    <div className="flex-auto text-xs text-current my-1 text-white dark:text-black">
                      <span className="mr-1">L -</span>
                      <span>
                        {new Date(
                          new Date().getTime() + 86400000 * 3
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                      LAS
                    </div>
                    <div className="text-xs">F*FAS</div>
                  </div>
                </div>
                <div className="border-dashed border-b-2 my-5 pt-5">
                  <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                </div>
                <div className="flex items-center mb-5 p-5 text-sm">
                  <div className="flex flex-col text-center">
                    <span className="text-sm">Ticket número:</span>
                    <div className="font-semibold">{ticket}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Divider className="my-10"></Divider>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl mb-4">
            Comparte tu opinión
          </h1>

          <div className="flex items-center mb-5">
            <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
              {calculateAverage()}
            </p>
            <p className="ms-2 font-medium text-gray-900 dark:text-white">
              {calculateAverage() <= 25
                ? "Malo"
                : calculateAverage() <= 50
                ? "Regular"
                : calculateAverage() <= 75
                ? "Bueno"
                : "Excelente"}
            </p>

            <a
              onClick={() => {
                saveToUserCollection();
              }}
              className="cursor-pointer ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Actualizar
            </a>
          </div>
          <div className="gap-8 sm:grid sm:grid-cols-2">
            <div>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Servicio
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${servicio}%` }}
                    ></div>
                  </div>
                  {/* <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    8.8
                  </span> */}
                  <Input
                    type="number"
                    name="servicio"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setServicio(event.target.value);
                      }
                    }}
                    value={servicio}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Comfort
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${comfort}%` }}
                    ></div>
                  </div>
                  <Input
                    type="number"
                    name="comfort"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setComfort(event.target.value);
                      }
                    }}
                    value={comfort}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  WiFi Gratis
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${wifi}%` }}
                    ></div>
                  </div>
                  <Input
                    type="number"
                    name="wifi"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setWifi(event.target.value);
                      }
                    }}
                    value={wifi}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Comodidades
                </dt>
                <dd className="flex items-center">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${comodidades}%` }}
                    ></div>
                  </div>
                  <Input
                    type="number"
                    name="comodidades"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setComodidades(event.target.value);
                      }
                    }}
                    value={comodidades}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Espacio
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${espacio}%` }}
                    ></div>
                  </div>
                  <Input
                    type="number"
                    name="espacio"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setEspacio(event.target.value);
                      }
                    }}
                    value={espacio}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Limpieza
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${limpieza}%` }}
                    ></div>
                  </div>
                  <Input
                    type="number"
                    name="limpieza"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setLimpieza(event.target.value);
                      }
                    }}
                    value={limpieza}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Locación
                </dt>
                <dd className="flex items-center">
                  <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                      style={{ width: `${locacion}%` }}
                    ></div>
                  </div>
                  <Input
                    type="number"
                    name="locacion"
                    onChange={(event) => {
                      if (
                        Number(event.target.value) <= 100 &&
                        Number(event.target.value) >= 1
                      ) {
                        setLocacion(event.target.value);
                      }
                    }}
                    value={locacion}
                    max={100}
                    min={0}
                    size="sm"
                    className="w-[60px] text-center align-middle"
                    variant="underlined"
                  ></Input>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-[100vh] lg:w-1/2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-[100vh] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default page;
