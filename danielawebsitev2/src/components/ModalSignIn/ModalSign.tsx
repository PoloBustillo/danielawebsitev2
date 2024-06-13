import React, { useState } from "react";
import { User, loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, Tab, Input, Link, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { ErrorAlert } from "../Alerts/ErrorAlert";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ModalSign({
  tabInit = "login",
  closeModal,
}: {
  tabInit: string;
  closeModal: Function;
}) {
  const [selected, setSelected] = useState(tabInit);
  const [loginServiceError, setLoginServiceError] = useState(
    "Error en servicio de inicio de sesión."
  );
  const [loginErrorModal, setLoginErrorModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  async function onSubmitLogin(data: User) {
    setLoginErrorModal(false);
    let res = await signIn("credentials", {
      redirect: false,
      password: data.password,
      token: null,
      email: data.email,
    });
    console.log(res);
    if (res?.error != null || res?.status != 200) {
      if (res?.error == "CredentialsSignin")
        setLoginServiceError("Error en credenciales para iniciar sesión");
      setLoginErrorModal(true);
    } else {
      closeModal();
    }
  }
  console.log(errors);

  return (
    <div className="flex flex-col w-full">
      <Tabs
        fullWidth
        size="md"
        color="secondary"
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab key="login" title="Acceder">
          {loginErrorModal && (
            <ErrorAlert
              onClose={() => {
                setLoginErrorModal(false);
              }}
              msg={loginServiceError}
            ></ErrorAlert>
          )}
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="flex flex-col gap-4"
          >
            <Input
              {...register("email")}
              isRequired
              name="email"
              label="Email"
              placeholder="Introduce tu email"
              isInvalid={errors?.email ? true : false}
              color={errors?.email ? "danger" : "default"}
              errorMessage={errors?.email?.message}
            />
            <Input
              {...register("password")}
              isRequired
              label="Contraseña"
              placeholder="Introduce tu contraseña"
              type="password"
              isInvalid={errors?.password ? true : false}
              color={errors?.password ? "danger" : "default"}
              errorMessage={errors?.password?.message}
            />
            <p className="text-center text-small">
              Necesitas crear una cuenta nueva?{" "}
              <Link
                size="sm"
                className="cursor-pointer"
                onPress={() => setSelected("sign-up")}
              >
                Crear cuenta
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary">
                Acceder
              </Button>
            </div>
          </form>
        </Tab>
        <Tab key="sign-up" title="Crear cuenta">
          <form className="flex flex-col gap-4">
            <div className="m-auto p-4">
              <div className="mb-4">Código de verificación:</div>
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <Input
              isRequired
              label="Contraseña"
              placeholder="Enter your contraseña"
              type="password"
            />
            <Input
              isRequired
              label="Confirme contraseña"
              placeholder="Confirme su contraseña"
              type="password"
            />
            <p className="text-center text-small">
              Ya tienes cuenta creada?{" "}
              <Link size="sm" onPress={() => setSelected("login")}>
                Acceder
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                onPress={async () => {
                  let res = await signIn("credentials", {
                    redirect: false,
                    password: "123",
                    token: "alsldasd",
                    email: "admin@admin.com",
                  });
                  console.log(res);
                }}
                fullWidth
                color="primary"
              >
                Crear cuenta nueva
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}
