import z from "zod";

export const sendEmailSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email invalido.",
      required_error: "Email es requerido.",
    })
    .email({ message: "No es un email valido" }),
  telefono: z
    .string({
      invalid_type_error: "Telefono invalido.",
      required_error: "Telefono es requerido.",
    })
    .min(10, { message: "Telefono es requerido" }),
});

export type Email = z.infer<typeof sendEmailSchema>;
