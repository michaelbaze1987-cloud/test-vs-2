"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { loginSchema } from "@/validators/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setMessage("Identifiants invalides");
      setPending(false);
      return;
    }

    const result = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    if (!result || result.error) {
      setMessage("Email ou mot de passe incorrect.");
      setPending(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Connexion</h1>
      <p className="text-sm text-slate-600">
        Connectez-vous pour suivre vos commandes et gerer votre panier.
      </p>
      <p className="rounded-md border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900">
        Mode demo: admin@demo.local / Admin123! ou client@demo.local / Client123!
      </p>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input className="field" id="email" name="email" type="email" required />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe
        </label>
        <input className="field" id="password" name="password" type="password" required minLength={8} />
      </div>

      {message ? (
        <p className="text-sm text-red-700" aria-live="polite">
          {message}
        </p>
      ) : null}

      <button className="btn btn-primary w-full" type="submit" disabled={pending}>
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
