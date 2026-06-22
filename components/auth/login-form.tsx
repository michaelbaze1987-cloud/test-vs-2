"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

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

    const normalizedEmail = email.trim().toLowerCase();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isEmailValid || password.trim().length < 8) {
      setMessage("Identifiants invalides");
      setPending(false);
      return;
    }

    const result = await signIn("credentials", {
      email: normalizedEmail,
      password,
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
    <form onSubmit={onSubmit} className="glass-panel mx-auto w-full max-w-md space-y-5 p-7">
      <div>
        <p className="section-kicker">Acces client</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Connexion</h1>
      </div>
      <p className="text-sm text-slate-300">
        Connectez-vous pour suivre vos commandes et gerer votre panier.
      </p>
      <p className="rounded-2xl border border-amber-300/35 bg-amber-400/10 p-3 text-xs text-amber-100">
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
        <p className="text-sm text-red-300" aria-live="polite">
          {message}
        </p>
      ) : null}

      <button className="btn btn-primary w-full" type="submit" disabled={pending}>
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
