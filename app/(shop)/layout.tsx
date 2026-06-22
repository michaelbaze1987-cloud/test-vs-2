import Link from "next/link";

import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container-shell flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-teal-800">
            Petits Lutins Malin
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
            <Link href="/products">Produits</Link>
            <Link href="/cart">Panier</Link>
            {session?.user?.role === "ADMIN" ? <Link href="/admin">Admin</Link> : null}
            {session?.user ? (
              <LogoutButton />
            ) : (
              <>
                <Link href="/login">Connexion</Link>
                <Link href="/register" className="btn btn-primary text-sm">
                  Creer un compte
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container-shell flex-1 py-8">{children}</main>
    </div>
  );
}
