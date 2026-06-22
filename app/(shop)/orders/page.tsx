import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getOrderTimeline, listOrdersByUser } from "@/lib/mock-store";

export const metadata = {
  title: "Mes commandes",
};

type OrdersPageProps = {
  searchParams?: Promise<{ placed?: string }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?next=/orders");
  }

  const params = (await searchParams) ?? {};
  const orders = listOrdersByUser(session.user.id);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Mes commandes</h1>
          <p className="text-slate-600">
            Suivez chaque commande de la preparation a la livraison.
          </p>
        </div>
        <Link href="/products" className="btn btn-secondary">
          Continuer mes achats
        </Link>
      </div>

      {params.placed ? (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
          Paiement confirme. Votre commande a bien ete creee et le suivi est disponible ci-dessous.
        </div>
      ) : null}

      {orders.length === 0 ? (
        <div className="card p-6 text-slate-600">Aucune commande pour le moment.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const timeline = getOrderTimeline(order);

            return (
              <article key={order.id} className="card space-y-5 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Commande {order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">Statut: {timeline.find((step) => step.current)?.label ?? order.status}</h2>
                    <p className="text-sm text-slate-600">
                      Passee le {order.createdAt.toLocaleDateString("fr-FR")} a {order.createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="text-2xl font-semibold text-teal-700">{order.total.toFixed(2)} EUR</p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  {timeline.map((step) => (
                    <div
                      key={step.status}
                      className={`rounded-2xl border p-4 ${step.reached ? "border-teal-300 bg-teal-50" : "border-slate-200 bg-white"}`}
                    >
                      <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                      <p className="mt-1 text-xs text-slate-600">{step.description}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        {step.at.toLocaleDateString("fr-FR")} {step.at.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Articles commandes</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-slate-200 pb-2 last:border-b-0">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-slate-500">Quantite: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-slate-700">{(item.price * item.quantity).toFixed(2)} EUR</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
