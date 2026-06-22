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
      <aside className="card h-fit p-4">
        <h2 className="mb-3 text-lg font-semibold">Administration</h2>
        <nav className="space-y-2 text-sm text-slate-700">
          <Link className="block" href="/admin">
            Dashboard
          </Link>
          <Link className="block" href="/admin/products">
            Produits
          </Link>
          <Link className="block" href="/admin/orders">
            Commandes
          </Link>
          <Link className="block" href="/admin/users">
            Clients
          </Link>
          <Link className="block" href="/admin/settings">
            Parametres
          </Link>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}
