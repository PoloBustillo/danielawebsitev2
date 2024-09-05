import React, { useEffect, useState } from "react";
import { DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { FormularioType } from "@/lib/types";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { Save } from "lucide-react";
import { set } from "zod";
const Formulario = ({
  formularioDoc,
  respuestaId,
  tareaUsuarioId,
  tareaId,
}: {
  formularioDoc: DocumentReference;
  respuestaId: string | undefined;
  tareaId: string;
  tareaUsuarioId: string;
}) => {
  const [temp, setTemp] = useState<string | undefined>();
  const [formularioData, setFormularioData] = useState<
    FormularioType | undefined
  >(undefined);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const submitForm = async (data: any): Promise<void> => {
    console.log(data);
    const doc = await getDoc(formularioDoc);
    let dataFormulario = doc.data() as FormularioType;
    let respuestas = await Promise.all(
      dataFormulario.preguntas.map(async (pregunta) => {
        let docPregunta = await getDoc(pregunta.pregunta);

        return {
          pregunta: pregunta.pregunta,
          respuesta: data[(docPregunta.data() as any)?.pregunta],
        };
      })
    );
    updateDoc(doc.ref, { preguntas: respuestas });
    console.log(respuestas);
  };

  useEffect(() => {
    (async () => {
      const doc = await getDoc(formularioDoc);
      let data = doc.data() as FormularioType;

      let preguntas = await Promise.all(
        data.preguntas.map(async (pregunta) => {
          let data = (await getDoc(pregunta.pregunta)).data() as any;

          if (pregunta.respuesta) {
            setValue(data.pregunta, pregunta.respuesta);
          }

          return data;
        })
      );

      setFormularioData({
        ...doc.data(),
        id: doc.id,
        preguntas: preguntas,
      } as FormularioType);
    })();
  }, []);
  return (
    <div>
      <div className="my-10">
        <h1 className="text-[20px] font-extrabold">{formularioData?.name!}</h1>
        <p className="text-medium">{formularioData?.description}</p>
      </div>
      <form>
        {formularioData?.preguntas.map((pregunta) => {
          if (pregunta.type.value == "options") {
            return (
              <fieldset className="relative z-0 m-auto w-[70%] mb-5 group">
                <legend className="peer-focus:font-mediumpy-4 text-md text-gray-500">
                  {pregunta.pregunta}
                </legend>
                {pregunta.type.options.map((option: { text: string }) => {
                  return (
                    <div className="flex items-center mb-4">
                      <input
                        {...register(pregunta.pregunta)}
                        name={pregunta.pregunta}
                        type="radio"
                        value={option.text}
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {option.text}
                      </label>
                    </div>
                  );
                })}
              </fieldset>
            );
          }
          if (pregunta.type.value == "range") {
            console.log(
              "🚀 ~ {formularioData?.preguntas.map ~ pregunta:",
              pregunta
            );

            return (
              <div className="relative m-auto w-[70%] mb-8">
                <div className="peer-focus:font-mediumpy-4 text-md text-gray-500">
                  <span>{pregunta.pregunta}</span>-<span>{temp}</span>
                </div>
                <input
                  {...register(pregunta.pregunta)}
                  id="labels-range-input"
                  type="range"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTemp(e.target.value);
                  }}
                  name={pregunta.pregunta}
                  min={pregunta.type.startRange}
                  max={pregunta.type.endRange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  {`Min (${pregunta.type.startRange})`}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  |
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  |
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  {`Max (${pregunta.type.endRange})`}
                </span>
              </div>
            );
          }
          if (pregunta.type.value == "open") {
            return (
              <div>
                <div className="relative z-0 m-auto w-[70%] mb-5 group">
                  <input
                    {...register(pregunta.pregunta)}
                    type="text"
                    name={pregunta.pregunta}
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {pregunta.pregunta}
                  </label>
                  <span className="text-[10px]">{pregunta.description}</span>
                </div>
              </div>
            );
          }
        })}
        <Button
          color={"success"}
          className="flex float-end"
          variant="ghost"
          type="submit"
          onClick={handleSubmit(submitForm)}
          startContent={<Save className="w-8 h-8" />}
        >
          Guardar cambios
        </Button>
      </form>
    </div>
  );
};

export default Formulario;
