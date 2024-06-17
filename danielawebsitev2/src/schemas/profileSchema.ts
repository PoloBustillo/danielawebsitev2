import z from "zod";

export const profileSchema = z.object({
  email: z.string(),
  image: z.any(),
  name: z.string(),
  celular: z.string(),
});

export type UserProfile = z.infer<typeof profileSchema>;
