import Link from "next/link";

import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { getStorefrontConfig } from "@/lib/storefront-config";

export default async function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [session, config] = await Promise.all([auth(), getStorefrontConfig()]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="dark-surface sticky top-0 z-20 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl">
        <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt={config.storeName} className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-lg font-semibold text-cyan-200 ring-1 ring-white/10">
                PL
              </div>
            )}
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-cyan-200">{config.location}</p>
              <p className="text-lg font-semibold tracking-tight text-white">{config.storeName}</p>
              <p className="text-xs text-slate-400">{config.slogan}</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-200">
            <Link href="/products">Produits</Link>
            <Link href="/cart">Panier</Link>
            {session?.user ? <Link href="/orders">Mes commandes</Link> : null}
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

      <main className="container-shell flex-1 py-10">{children}</main>
      <StorefrontFooter config={config} />
    </div>
  );
}
