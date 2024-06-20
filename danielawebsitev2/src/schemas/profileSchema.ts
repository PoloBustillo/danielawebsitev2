import z, { union } from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const profileSchema = z.object({
  email: z.any(),
  image: z.any(),
  celular: z
    .union([
      z
        .string()
        .regex(phoneRegex, "El número de teléfono no es válido")
        .min(10, { message: "El número debe ser de 10 dígitos mínimo" }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  name: z
    .union([
      z.string().min(4, { message: "El nombre debe ser de 4 dígitos mínimo" }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  apellidoPaterno: z
    .union([
      z
        .string()
        .min(4, { message: "El apellido debe ser de 4 dígitos mínimo" }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  apellidoMaterno: z
    .union([
      z
        .string()
        .min(4, { message: "El apellido debe ser de 4 dígitos mínimo" }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export type UserProfile = z.infer<typeof profileSchema>;
