import { listOrders } from "@/lib/mock-store";

export const metadata = {
  title: "Admin Commandes",
};

export default async function AdminOrdersPage() {
  const orders = listOrders();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Commandes</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <article key={order.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">Commande {order.id.slice(0, 8).toUpperCase()}</p>
              <span className="badge">{order.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">Client: {order.user.email}</p>
            <p className="text-sm text-slate-600">Total: {Number(order.total).toFixed(2)} EUR</p>
            <p className="mt-2 text-xs text-slate-500">Lignes: {order.items.length}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
