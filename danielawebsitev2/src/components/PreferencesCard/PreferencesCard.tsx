import { cn } from "@/utils/functions";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  RadioGroup,
  Spacer,
} from "@nextui-org/react";
import { BellRing, Rss } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CustomRadio } from "../CustomRadio/CustomRadio";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase-config";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const PreferencesCard = () => {
  const [blogCheck, setBlogCheck] = useState(false);
  const [notificationCheck, setNotificationCheck] = useState(false);
  const [notificationType, setNotificationType] = useState<string>("email");
  const { data: session, status, update: sessionUpdate } = useSession();
  const [accountId, setAccountId] = useState<string>();

  useEffect(() => {
    (async () => {
      let accounts = collection(db, "accounts");
      const queryAccount = query(
        accounts,
        where("userId", "==", session?.user?.id)
      );
      const querySnapshot = await getDocs(queryAccount);
      querySnapshot.forEach((docData) => {
        setAccountId(docData.id);
        if (docData.data().blogSubscription) setBlogCheck(true);
        if (docData.data().notification) setNotificationCheck(true);
        if (docData.data().notificationType) {
          setNotificationType(docData.data().notificationType);
        } else {
          setDoc(
            doc(db, "accounts", docData.id),
            { notificationType: "email" },
            { merge: true }
          );
        }
      });
    })();
  }, []);

  return (
    <Card className="my-4 p-4 w-[80vw] sm:w-full">
      <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
        <h4 className="font-bold text-large">Preferencias:</h4>
        <small className="text-default-500">{`ACCOUNT ID:${accountId}`}</small>
      </CardHeader>
      <CardBody className="pb-0 pt-2 p-4 grid grid-cols-1 gap-4 align-middle justify-around content-center">
        <div className="grid grid-col-1 md:grid-cols-2 md:gap-20 md:p-6">
          <Checkbox
            aria-label={"notificaciones"}
            classNames={{
              base: cn(
                "inline-flex w-full max-w-md bg-content1",
                "hover:bg-content2 items-center justify-start",
                "cursor-pointer rounded-lg gap-2 p-4 mb-10 border-2 border-transparent",
                "data-[selected=true]:border-primary"
              ),
              label: "w-full",
            }}
            isSelected={blogCheck}
            onValueChange={(value) => {
              setBlogCheck(value);
              setDoc(
                doc(db, "accounts", accountId as string),
                { blogSubscription: value },
                { merge: true }
              );
            }}
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col md:flex-row items-end gap-2">
                <div className="flex flex-col p-4 align-middle justify-center">
                  <div className="text-center mb-2 self-center">
                    <Rss />
                  </div>

                  <div className="text-center">Subscripcion al blog</div>
                </div>
                <div className=" hidden lg:flex-col lg:flex h-[80%] py-6">
                  <div className="text-tiny text-center text-default-500 mb-2">
                    Recibe noticias de nuevos post.
                  </div>
                  <div className="flex  items-end gap-2 self-center">
                    <Chip
                      color={blogCheck ? "success" : "default"}
                      size="sm"
                      variant="flat"
                    >
                      {blogCheck ? "Habilitado" : "Deshabilitado"}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </Checkbox>
          <Checkbox
            aria-label={"notificaciones"}
            classNames={{
              base: cn(
                "inline-flex w-full max-w-md bg-content1",
                "hover:bg-content2 items-center justify-start",
                "cursor-pointer rounded-lg gap-2 p-4 mb-10 border-2 border-transparent",
                "data-[selected=true]:border-primary"
              ),
              label: "w-full",
            }}
            isSelected={notificationCheck}
            onValueChange={(value) => {
              setNotificationCheck(value);
              setDoc(
                doc(db, "accounts", accountId as string),
                { notification: value },
                { merge: true }
              );
            }}
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col md:flex-row items-end gap-2">
                <div className="flex flex-col p-4 align-middle justify-center">
                  <div className="text-center mb-2 self-center">
                    <BellRing />
                  </div>

                  <div className="text-center">Notificaciones</div>
                </div>
                <div className=" hidden lg:flex-col lg:flex h-[80%] py-6">
                  <div className="text-tiny text-center text-default-500 mb-2">
                    Recibe notificaciones en tu medio preferido.
                  </div>
                  <div className="flex  items-end gap-2 self-center">
                    <Chip
                      color={notificationCheck ? "success" : "default"}
                      size="sm"
                      variant="flat"
                    >
                      {notificationCheck ? "Habilitado" : "Deshabilitado"}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </Checkbox>
        </div>

        {notificationCheck && (
          <div className="m-auto  md:mx-24">
            <Spacer y={2} />
            <RadioGroup
              defaultValue={notificationType}
              onChange={(value) => {
                setNotificationType(value.target.value);
                setDoc(
                  doc(db, "accounts", accountId as string),
                  { notificationType: value.target.value },
                  { merge: true }
                );
              }}
              label={<div className="text-xl">MÉTODOS DE NOTIFICACIÓN</div>}
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
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default PreferencesCard;
