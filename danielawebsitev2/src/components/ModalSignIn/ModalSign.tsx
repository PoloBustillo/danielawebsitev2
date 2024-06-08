import React, { useState } from "react";
import { User, loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { error } from "console";

export default function ModalSign({ tabInit = "login" }: { tabInit: string }) {
  const [selected, setSelected] = useState(tabInit);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: User) {
    console.log(data);
    let res = await signIn("credentials", {
      redirect: false,
      password: "123",
      token: "alsldasd",
      email: "admin@admin.com",
    });
    console.log(res);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
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
          <form className="flex flex-col gap-4 h-[300px]">
            <Input
              isRequired
              label="Name"
              placeholder="Enter your name"
              type="password"
            />
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
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
