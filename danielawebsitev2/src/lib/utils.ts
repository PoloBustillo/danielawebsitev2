import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const statusColorMap = {
  completado: "success",
  inicio: "danger",
  enProgreso: "warning",
};

export const statusOptions = [
  { name: "Nueva", uid: "inicio" },
  { name: "En Progreso", uid: "enProgreso" },
  { name: "Completada", uid: "completado" },
];

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "ESTADO", uid: "status" },
  { name: "FECHA INICIO", uid: "fechaInicio", sortable: true },
  { name: "FECHA FIN", uid: "fechaFin", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];
