import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";

const Bio = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-[#37354b]  dark:bg-default-100/50 max-w-[610px] m-4 p-10 pt-3 "
      //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
    >
      <CardBody className="flex flex-col my-3 justify-center">
        <div className="flex  justify-center">
          <div className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] dark:from-yellow-200 dark:via-red-500 dark:to-fuchsia-500 relative inline-flex items-center justify-center w-[30vh] h-[30-vh] text-gray-900  animate-morphdiv">
            <div className="p-2">
              <Avatar
                radius="full"
                color="secondary"
                src="/assets/psicDaniela.jpg"
                title="Psicologa Daniela Diaz"
                className="w-[25vh] h-[25vh] text-large "
              />
            </div>
          </div>
        </div>
        <p className="flex  justify-center text-medium text-[whitesmoke] font-extrabold leading-8">
          Psicóloga Daniela Diaz Merino
        </p>
        <p className="flex mt-4  justify-center text-center text-small text-[whitesmoke]  leading-8">
          Psicólogo Puebla Daniela Diaz es un Licenciada en Psicología con
          consulta en la ciudad de Heroica Puebla de Zaragoza, Puedes conocerla
          y reservar cita.Amplia experiencia en diversas metodologías de la
          psicología. Terapia en educación especial.
        </p>
      </CardBody>
    </Card>
  );
};

export default Bio;
