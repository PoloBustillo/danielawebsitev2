import z from "zod";

export const profileSchema = z.object({
  email: z.string(),
});

export type UserProfile = z.infer<typeof profileSchema>;
