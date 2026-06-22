"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { authInitialState, registerAction } from "@/actions/auth/register";

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerAction, authInitialState);

  useEffect(() => {
    if (state.success) {
      router.push("/");
      router.refresh();
    }
  }, [router, state.success]);

  return (
    <form action={formAction} className="glass-panel mx-auto w-full max-w-md space-y-5 p-7">
      <div>
        <p className="section-kicker">Inscription</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Creer un compte</h1>
      </div>
      <p className="text-sm text-slate-300">
        Creer un compte client pour sauvegarder votre panier et vos commandes.
      </p>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nom complet
        </label>
        <input className="field" id="name" name="name" required />
      </div>

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

      {state.message && !state.success ? (
        <p className="text-sm text-red-300" aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <button className="btn btn-primary w-full" type="submit" disabled={pending}>
        {pending ? "Creation..." : "Creer mon compte"}
      </button>
    </form>
  );
}
