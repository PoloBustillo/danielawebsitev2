import { cn } from "@/utils/functions";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  RadioGroup,
} from "@nextui-org/react";
import { Rss } from "lucide-react";
import React from "react";
import { CustomRadio } from "../CustomRadio/CustomRadio";
import { useSession } from "next-auth/react";

const PreferencesCard = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [blogCheck, setBlogCheck] = React.useState(false);
  const { data: session, status, update: sessionUpdate } = useSession();
  return (
    <Card className="my-4 p-4 w-70wv">
      <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
        <h4 className="font-bold text-large">Preferencias:</h4>
        <small className="text-default-500">{`ID:${session?.user?.id}`}</small>
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
            onValueChange={setBlogCheck}
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
  );
};

export default PreferencesCard;
