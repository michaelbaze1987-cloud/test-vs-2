import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Adresse email invalide").trim().toLowerCase(),
  password: z.string().min(8, "Mot de passe trop court"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Le nom est requis").max(60),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
