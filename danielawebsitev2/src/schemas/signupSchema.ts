import z from "zod";

export const signupSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email invalido.",
        required_error: "Email es requerido.",
      })
      .email({ message: "No es un email valido" }),
    password: z
      .string({
        invalid_type_error: "Password invalido.",
        required_error: "Password es requerido.",
      })
      .min(4, { message: "Constraseña es requerida" }),
    passwordConfirm: z
      .string({
        invalid_type_error: "Password invalido.",
        required_error: "Password es requerido.",
      })
      .min(4, { message: "Constraseña es requerida" }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden.",
        path: ["passwordConfirm"],
      });
    }
  });

export type NewUser = z.infer<typeof signupSchema>;
