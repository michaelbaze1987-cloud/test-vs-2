import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/login?next=/admin");
  }

  return (
    <div className="container-shell grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="glass-panel h-fit p-5">
        <p className="section-kicker">Back office</p>
        <h2 className="mb-4 mt-2 text-lg font-semibold text-white">Administration</h2>
        <nav className="space-y-2 text-sm text-slate-300">
          <Link className="block rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/admin">
            Dashboard
          </Link>
          <Link className="block rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/admin/products">
            Produits
          </Link>
          <Link className="block rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/admin/orders">
            Commandes
          </Link>
          <Link className="block rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/admin/users">
            Clients
          </Link>
          <Link className="block rounded-2xl px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/admin/settings">
            Parametres
          </Link>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}
