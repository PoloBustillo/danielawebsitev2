"use client";
import { Button } from "@nextui-org/react";
import React, { use } from "react";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const { toast } = useToast();
  return (
    <div className="bg-background py-10 ">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold m-4">Status de servicios</h1>
        <div className="grid grid-cols-3 gap-4 m-10">
          <div className="col-span-3 md:col-span-1">
            <div className="bg-green-500 p-4 rounded-lg text-center">
              <h2 className="text-lg font-medium">Serivicios de citas</h2>
              <p className="text-sm">Bien</p>
            </div>
          </div>
          <div className="col-span-3 md:col-span-1">
            <div className="bg-green-500 p-4 rounded-lg text-center">
              <h2 className="text-lg font-medium">Servicios de contenido</h2>
              <p className="text-sm">Excelente</p>
            </div>
          </div>
          <div className="col-span-3 md:col-span-1">
            <div className="bg-orange-500 p-4 rounded-lg text-center">
              <h2 className="text-lg font-medium">Notificaciones</h2>
              <p className="text-sm">Intermitente</p>
            </div>
            <div className="m-auto align-middle text-center">
              <Button
                className="w-[90%] my-4"
                color="secondary"
                variant="ghost"
                onClick={() => {
                  toast({
                    title: "Gracias por tu retroalimentación",
                    description: "Tu reporte ha sido enviado",
                  });
                }}
              >
                Notificar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
