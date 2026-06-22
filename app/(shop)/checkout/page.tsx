import { redirect } from "next/navigation";

import { auth } from "@/auth";

export const metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?next=/checkout");
  }

  return (
    <section className="card max-w-2xl space-y-4 p-6">
      <h1 className="text-3xl font-semibold">Paiement</h1>
      <p className="text-slate-600">
        Cette page est prete pour l'integration Stripe Checkout. Le flux principal est deja
        centre sur les Server Actions (creation de commande depuis le panier).
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
        <li>Generer une session Stripe depuis une Server Action.</li>
        <li>Rediriger le client vers Stripe Checkout.</li>
        <li>Mettre a jour le statut de commande via webhook.</li>
      </ul>
    </section>
  );
}
