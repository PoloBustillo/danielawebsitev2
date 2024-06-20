import {
  getFile,
  saveAvatarImageToStorage,
  saveDataForUser,
  saveImageForUser,
} from "@/lib/api";
// @ts-ignore
import dobToAge from "dob-to-age";
import { profileSchema } from "@/schemas/profileSchema";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  DateInput,
  DateValue,
  Input,
} from "@nextui-org/react";
import { SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import PhotoCard from "./PhotoCard";

function ProfileCard() {
  const { data: session, status, update: sessionUpdate } = useSession();
  const [imageAvatar, setImageAvatar] = useState(session?.user?.image!);
  const [date, setDate] = useState(null as DateValue | null);
  const [errors, setErrors] = useState<any>({});
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

    const response = profileSchema.safeParse({
      name: formData.name!,
      celular: formData.celular!,
      apellidoPaterno: formData.apellidoPaterno!,
      apellidoMaterno: formData.apellidoMaterno!,
      edad: formData.edad!,
      sexo: formData.sexo!,
      religion: formData.religion!,
      ocupacion: formData.ocupacion!,
      escolaridad: formData.escolaridad!,
    });

    if (!response.success) {
      let errArr: { [key: string]: string }[] = [];
      const { errors: err } = response.error;
      for (var i = 0; i < err.length; i++) {
        errArr = { ...errArr, [err[i].path[0]]: err[i].message };
      }
      setErrors(errArr);
      throw err;
    }

    setErrors([]);

    let user = { ...session?.user };
    if (!errors.name) {
      user = { ...user, name: formData.name };
    }
    if (!errors.celular) {
      user = { ...user, celular: formData.celular };
    }
    if (!errors.apellidoPaterno) {
      user = { ...user, apellidoPaterno: formData.apellidoPaterno };
    }
    if (!errors.apellidoMaterno) {
      user = { ...user, apellidoMaterno: formData.apellidoMaterno };
    }
    if (date) {
      user = { ...user, fechaNacimiento: date.toString() };
    }
    if (formData.sexo) {
      user = { ...user, sexo: formData.sexo };
    }
    if (formData.religion) {
      user = { ...user, religion: formData.religion };
    }
    if (formData.ocupacion) {
      user = { ...user, ocupacion: formData.ocupacion };
    }
    if (formData.escolaridad) {
      user = { ...user, escolaridad: formData.escolaridad };
    }
    saveDataForUser(session?.user?.id!, user);
    if ((formData.image as File).name != undefined) {
      let imagePath = await saveAvatarImageToStorage(
        formData.image,
        session?.user?.id!
      );
      let imageUrl = await getFile(imagePath);
      saveImageForUser(session?.user?.id!, imageUrl);
      user = { ...user, image: imageUrl };
    }

    sessionUpdate({ ...session, user: { ...user } });
  };

  useEffect(() => {
    if (session?.user && status == "authenticated") {
      setFormData({
        ...formData,
        name: session?.user?.name!,
        celular: session?.user?.celular!,
        image: session?.user?.image!,
        religion: session?.user?.religion!,
        sexo: session?.user?.sexo!,
        ocupacion: session?.user?.ocupacion!,
        escolaridad: session?.user?.escolaridad!,
        apellidoPaterno: session?.user?.apellidoPaterno!,
        apellidoMaterno: session?.user?.apellidoMaterno!,
      });
      if (session.user.fechaNacimiento) {
        setDate(parseDate(session?.user?.fechaNacimiento!));
      }
      setImageAvatar(session?.user?.image!);
    }
  }, [session]);
  return (
    <>
      <PhotoCard></PhotoCard>
      <Card className="my-4 p-4 w-70wv">
        <CardHeader className="pb-0 p-4 flex-col items-start">
          <h4 className="font-bold text-large">Mi Perfil:</h4>
          <small className="text-default-500">
            {`ID:${session?.user?.id!}`}
          </small>
          <Button
            color={"secondary"}
            isIconOnly
            type="submit"
            className="text-center  absolute right-[5%] w-[10%] top-[5%] h-14"
            endContent={<SaveIcon className="w-8 h-8" />}
            onClick={handleSubmit}
          ></Button>
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
                  className=" md:w-[30vw] w-[100%]"
                  name="name"
                  onClear={() => {
                    setFormData({ ...formData, name: "" });
                  }}
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={errors?.name ? true : false}
                  color={errors?.name ? "danger" : "secondary"}
                  errorMessage={errors?.name?.message}
                />
                {errors.name && (
                  <div className="mt-1 text-xs text-red-500">{errors.name}</div>
                )}
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
                  className=" md:w-[30vw] w-[100%]"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  isInvalid={errors?.apellidoPaterno ? true : false}
                  color={errors?.apellidoPaterno ? "danger" : "secondary"}
                  errorMessage={errors?.apellidoPaterno?.message}
                />
                {errors.apellidoPaterno && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.apellidoPaterno}
                  </div>
                )}
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
                  className=" md:w-[30vw] w-[100%]"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleChange}
                  isInvalid={errors?.apellidoMaterno ? true : false}
                  color={errors?.apellidoMaterno ? "danger" : "secondary"}
                  errorMessage={errors?.apellidoMaterno?.message}
                />
                {errors.apellidoMaterno && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.apellidoMaterno}
                  </div>
                )}
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
                  className=" md:w-[30vw] w-[100%]"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  isInvalid={errors?.celular ? true : false}
                  color={errors?.celular ? "danger" : "secondary"}
                  errorMessage={errors?.celular?.message}
                />
                {errors.celular && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.celular}
                  </div>
                )}
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
                  className=" md:w-[30vw] w-[100%]"
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
                  className=" md:w-[30vw] w-[100%]"
                />
              </div>
              <div>
                <p className="text-tiny uppercase font-bold">Sexo:</p>
                <Input
                  isClearable
                  type="text"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  variant="bordered"
                  placeholder="Introduzca su nombre"
                  defaultValue=""
                  className=" md:w-[30vw] w-[100%]"
                />
              </div>
              <div>
                <p className="text-tiny uppercase font-bold">Religión:</p>
                <Input
                  isClearable
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  variant="bordered"
                  placeholder="Introduzca su nombre"
                  defaultValue=""
                  className=" md:w-[30vw] w-[100%]"
                />
              </div>
              <div>
                <p className="text-tiny uppercase font-bold">Ocupación:</p>
                <Input
                  isClearable
                  type="text"
                  name="ocupacion"
                  value={formData.ocupacion}
                  onChange={handleChange}
                  variant="bordered"
                  placeholder="Introduzca su nombre"
                  defaultValue=""
                  className=" md:w-[30vw] w-[100%]"
                />
              </div>
              <div>
                <p className="text-tiny uppercase font-bold">Escolaridad:</p>
                <Input
                  isClearable
                  type="text"
                  name="escolaridad"
                  value={formData.escolaridad}
                  onChange={handleChange}
                  variant="bordered"
                  placeholder="Introduzca su nombre"
                  defaultValue=""
                  className=" md:w-[30vw] w-[100%]"
                />
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileCard;
