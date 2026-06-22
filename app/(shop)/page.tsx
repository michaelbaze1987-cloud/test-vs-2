import Link from "next/link";

import { getAllCategories, getFeaturedProducts } from "@/lib/catalog";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
  ]);

  return (
    <section className="space-y-8">
      <div className="card overflow-hidden p-8">
        <p className="badge">Dropshipping IT & Electronique</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Boutique electronique concue pour scaler avec Next.js 16
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          App Router, Server Actions et architecture admin prete pour piloter votre
          catalogue multi-fournisseurs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/products" className="btn btn-primary">
            Voir le catalogue
          </Link>
          <Link href="/admin" className="btn btn-secondary">
            Ouvrir l'administration
          </Link>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Produits a la une</h2>
          <Link href="/products" className="text-sm font-medium text-teal-700">
            Tout voir
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article key={product.id} className="card overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="h-44 w-full object-cover" />
              <div className="space-y-2 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{product.category.name}</p>
                <h3 className="line-clamp-2 text-lg font-semibold">{product.name}</h3>
                <p className="font-semibold text-teal-700">{Number(product.price).toFixed(2)} EUR</p>
                <Link href={`/products/${product.slug}`} className="btn btn-secondary w-full text-sm">
                  Details produit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Explorer les categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
