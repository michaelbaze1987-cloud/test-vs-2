"use server";

import { registerSchema } from "@/validators/auth";

export type AuthActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const authInitialState: AuthActionState = {
  success: false,
  message: "",
};

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Formulaire invalide",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message:
      "Inscription de demonstration validee. Pour tester la connexion, utilisez client@demo.local / Client123! ou admin@demo.local / Admin123!",
  };
}
