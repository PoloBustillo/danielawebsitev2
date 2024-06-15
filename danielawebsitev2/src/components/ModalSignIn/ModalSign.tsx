import React, { useState } from "react";
import { User, loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, Tab, Input, Link, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { ErrorAlert } from "../Alerts/ErrorAlert";
import { NewUser, signupSchema } from "@/schemas/signupSchema";

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
  const [signupServiceError, setSingupServiceError] = useState(
    "Error en crear usuario: Revise los datos. Usario ya existe o problemas de conexión"
  );
  const [loginErrorModal, setLoginErrorModal] = useState(false);
  const [signupErrorModal, setSignupErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm<NewUser>({ resolver: zodResolver(signupSchema) });

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
  async function onSubmitCreateUser(data: NewUser) {
    setSignupErrorModal(false);
    let res = await signIn("credentials", {
      redirect: false,
      password: data.password,
      isSignup: true,
      passwordConfirmation: data.passwordConfirm,
      email: data.email,
    });
    console.log(res);
    if (res?.error != null || res?.status != 200) {
      setSingupServiceError(
        "Error en crear usuario: Revise los datos. Usario ya existe o problemas de conexión"
      );
      setSignupErrorModal(true);
    } else {
      closeModal();
    }
  }
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
          {signupErrorModal && (
            <ErrorAlert
              onClose={() => {
                setSignupErrorModal(false);
              }}
              msg={signupServiceError}
            ></ErrorAlert>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmitSignup(onSubmitCreateUser)}
          >
            <Input
              {...registerSignup("email")}
              isRequired
              label="Email"
              placeholder="Introduce tu email"
              type="email"
              isInvalid={errorsSignup?.email ? true : false}
              color={errorsSignup?.email ? "danger" : "default"}
              errorMessage={errorsSignup?.email?.message}
            />

            <Input
              {...registerSignup("password")}
              isRequired
              label="Contraseña"
              placeholder="Introduce tu contraseña"
              type="password"
              isInvalid={errorsSignup?.password ? true : false}
              color={errorsSignup?.password ? "danger" : "default"}
              errorMessage={errorsSignup?.password?.message}
            />
            <Input
              {...registerSignup("passwordConfirm")}
              isRequired
              label="Confirme contraseña"
              placeholder="Confirme su contraseña"
              type="password"
              isInvalid={errorsSignup?.passwordConfirm ? true : false}
              color={errorsSignup?.passwordConfirm ? "danger" : "default"}
              errorMessage={errorsSignup?.passwordConfirm?.message}
            />
            <p className="text-center text-small">
              Ya tienes cuenta creada?{" "}
              <Link size="sm" onPress={() => setSelected("login")}>
                Acceder
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary">
                Crear cuenta nueva
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}
