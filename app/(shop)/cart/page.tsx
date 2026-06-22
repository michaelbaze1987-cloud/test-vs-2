import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/auth";
import { removeFromCartAction } from "@/actions/cart/remove-from-cart";
import { updateCartQuantityAction } from "@/actions/cart/update-quantity";
import { getCartByUserId } from "@/lib/mock-store";

export const metadata = {
  title: "Panier",
};

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?next=/cart");
  }

  const cart = getCartByUserId(session.user.id);

  const subtotal =
    cart?.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0) ?? 0;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Votre panier</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="card p-6 text-slate-600">Votre panier est vide.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cart.items.map((item) => {
              const updateAction = updateCartQuantityAction.bind(null, item.id);
              const removeAction = removeFromCartAction.bind(null, item.id);

              return (
                <article key={item.id} className="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p className="text-sm text-slate-600">{Number(item.product.price).toFixed(2)} EUR</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <form action={updateAction} className="flex items-center gap-2">
                      <input
                        className="field w-20"
                        type="number"
                        name="quantity"
                        min={1}
                        defaultValue={item.quantity}
                      />
                      <button type="submit" className="btn btn-secondary text-sm">
                        Mettre a jour
                      </button>
                    </form>

                    <form action={removeAction}>
                      <button type="submit" className="btn text-sm text-red-700">
                        Supprimer
                      </button>
                    </form>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="card space-y-3 p-5">
            <p className="text-sm uppercase tracking-wide text-slate-500">Recapitulatif</p>
            <p className="text-2xl font-semibold text-teal-700">{subtotal.toFixed(2)} EUR</p>
            <Link href="/checkout" className="btn btn-primary w-full">
              Passer au paiement
            </Link>
          </aside>
        </>
      )}
    </section>
  );
}
