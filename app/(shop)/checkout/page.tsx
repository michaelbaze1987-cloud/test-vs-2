import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/auth";
import { createOrderFromCartAction } from "@/actions/orders/create-order";
import { getCartByUserId } from "@/lib/mock-store";

export const metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?next=/checkout");
  }

  const cart = getCartByUserId(session.user.id);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="card space-y-5 p-6">
        <div>
          <p className="badge">Etape paiement</p>
          <h1 className="mt-3 text-3xl font-semibold">Validation du paiement</h1>
          <p className="mt-2 text-slate-600">
            Pour la demo, le paiement est simule. En production, cette action declencherait
            Stripe Checkout avant creation definitive de la commande.
          </p>
        </div>

        <div className="space-y-3">
          {cart.items.map((item) => (
            <article key={item.id} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-b-0">
              <div>
                <h2 className="font-medium">{item.product.name}</h2>
                <p className="text-sm text-slate-500">Quantite: {item.quantity}</p>
              </div>
              <p className="font-medium text-slate-700">
                {(item.product.price * item.quantity).toFixed(2)} EUR
              </p>
            </article>
          ))}
        </div>

        <form action={createOrderFromCartAction} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1 text-sm font-medium">
              Titulaire de la carte
              <input className="field" defaultValue={session.user.name ?? "Client Demo"} name="cardholder" />
            </label>
            <label className="space-y-1 text-sm font-medium">
              Carte test
              <input className="field" defaultValue="4242 4242 4242 4242" name="card" />
            </label>
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Payer et creer la commande
          </button>
        </form>
      </div>

      <aside className="card h-fit space-y-4 p-6">
        <h2 className="text-xl font-semibold">Resume</h2>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Articles</span>
          <span>{cart.items.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Livraison</span>
          <span>Incluse</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-teal-700">
          <span>Total</span>
          <span>{total.toFixed(2)} EUR</span>
        </div>
        <Link href="/cart" className="btn btn-secondary w-full">
          Retour au panier
        </Link>
      </aside>
    </section>
  );
}
