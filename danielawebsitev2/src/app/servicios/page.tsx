import { Button } from "@nextui-org/react";
import React from "react";

const Procesos = () => {
  return (
    <section className="bg-background py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold  sm:text-5xl">
            Servicios Empresariales
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Precios y planes para todos los tamaños de empresas.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#37354b] text-white dark:bg-[#1c1c1c] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">
                Psicología y Pedagogía:
              </h3>
              <p className="mt-4 text-gray-400">
                Intervención en casos de acoso escolar o laboral.
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">
                Desde $5000
              </span>
              <span className="text-xl font-medium text-gray-400">/mo</span>
            </div>
            <ul className="mb-24 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Asesoramiento en clima laboral</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Campañas para fomentar un ambiente positivo y productivo.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Programas de desarrollo del talento</span>
              </li>
            </ul>
            <Button
              color="primary"
              className="bottom-6 left-[10%] right-[10%] absolute h-12 w-[50%] lg:w-[80%] mx-auto bottom-4block  py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Información
            </Button>
          </div>
          <div className="bg-[#37354b] text-white dark:bg-[#1c1c1c] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">
                Medicina y Psicología:
              </h3>
              <p className="mt-4 text-gray-400">
                Programas de salud mental en empresas
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">
                Desde $2000
              </span>
              <span className="text-xl font-medium text-gray-400">/mo</span>
            </div>
            <ul className="mb-24 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Prevención de burnout, estrés laboral, promoción del bienestar
                  emocional.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Atención integral a pacientes crónicos.</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Gestión del dolor crónico: Abordar el dolor desde una
                  perspectiva biopsicosocial
                </span>
              </li>
            </ul>
            <Button
              color="primary"
              className="bottom-6 left-[10%] right-[10%] absolute h-12 w-[50%] lg:w-[80%] mx-auto bottom-4block  py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Información
            </Button>
          </div>
          <div className="bg-[#37354b] text-white dark:bg-[#1c1c1c] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">
                Pedagogía y Medicina
              </h3>
              <p className="mt-4 text-gray-400">
                Evaluaciones neuropsicológicas
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">
                Desde $1500
              </span>
              <span className="text-xl font-medium text-gray-400">/mo</span>
            </div>
            <ul className="mb-24 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Identificar dificultades de aprendizaje asociadas a
                  condiciones médicas.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span> Diseño de programas educativos adaptados</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Promoción de hábitos saludables en escuelas: Nutrición,
                  actividad física, higiene mental.
                </span>
              </li>
            </ul>
            <Button
              color="primary"
              className="bottom-6 left-[10%] right-[10%] absolute h-12 w-[50%] lg:w-[80%] mx-auto bottom-4block  py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Información
            </Button>
          </div>
          <div className="bg-[#37354b] text-white dark:bg-[#1c1c1c] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">
                Servicios combinados
              </h3>
              <p className="mt-4 text-gray-400">Acompañamiento personalizado</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">
                Desde $2000
              </span>
              <span className="text-xl font-medium text-gray-400">/mo</span>
            </div>
            <ul className="mb-24 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Coaching ejecutivo y psicoterapia</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Asesoramiento en diseño de espacios de trabajo saludables
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Programas de prevención de adicciones</span>
              </li>
            </ul>
            <Button
              color="primary"
              className="bottom-6 left-[10%] right-[10%] absolute h-12 w-[50%] lg:w-[80%] mx-auto bottom-4block  py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Información
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Procesos;
