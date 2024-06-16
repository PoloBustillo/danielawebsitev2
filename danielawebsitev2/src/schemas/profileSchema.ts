import z from "zod";

export const profileSchema = z.object({
  email: z.string(),
  image: z.any(),
});

export type UserProfile = z.infer<typeof profileSchema>;
