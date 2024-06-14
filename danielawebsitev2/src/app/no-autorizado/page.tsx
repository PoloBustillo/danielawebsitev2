import { Button, Link as LinkUI } from "@nextui-org/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex items-center h-full p-16 bg-background dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-focus">
            <span className="sr-only">No Autorizado</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Accede a tu cuenta para ver este recurso
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Para hacer uso de este recurso, por favor inicia sesión
          </p>
          <Link href={"/"}>
            <Button
              as={LinkUI}
              className="px-8 py-3 font-semibold rounded text-white bg-foreground dark:text-gray-900 dark:bg-focus"
              showAnchorIcon
              variant="solid"
            >
              Ir a la página Principal
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
