import { getAdminStats } from "@/lib/mock-store";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const { products, orders, customers } = getAdminStats();

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold">Dashboard admin</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="card p-5">
          <p className="text-sm text-slate-500">Produits actifs</p>
          <p className="mt-2 text-3xl font-semibold text-teal-700">{products}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-slate-500">Commandes</p>
          <p className="mt-2 text-3xl font-semibold text-teal-700">{orders}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-slate-500">Clients</p>
          <p className="mt-2 text-3xl font-semibold text-teal-700">{customers}</p>
        </article>
      </div>
    </div>
  );
}
