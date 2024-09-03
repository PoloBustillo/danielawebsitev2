import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const statusColorMap = {
  completada: "success",
  revisada: "primary",
  abierta: "warning",
};

export const statusOptions = [
  { name: "Nueva", uid: "abierta" },
  { name: "Revisada", uid: "revisada" },
  { name: "Entregada", uid: "entregada" },
];

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "ESTADO", uid: "status" },
  { name: "DESCRIPCÓN", uid: "descripcion" },
  { name: "FECHA INICIO", uid: "start", sortable: true },
  { name: "FECHA FIN", uid: "end", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];
