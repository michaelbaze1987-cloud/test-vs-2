import Link from "next/link";

import { getAllProducts } from "@/lib/catalog";

export const metadata = {
  title: "Produits",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="space-y-5">
      <div>
        <p className="section-kicker">Catalogue</p>
        <h1 className="section-title text-white">Catalogue produits</h1>
      </div>
      <p className="max-w-2xl text-slate-300">
        Catalogue public avec pagination et filtres a brancher dans une iteration suivante.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="glass-panel overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="h-52 w-full object-cover" />
            <div className="space-y-3 p-5">
              <h2 className="text-xl font-semibold text-white">{product.name}</h2>
              <p className="line-clamp-2 text-sm text-slate-300">{product.description}</p>
              <p className="font-semibold text-cyan-200">{Number(product.price).toFixed(2)} EUR</p>
              <Link href={`/products/${product.slug}`} className="btn btn-secondary w-full text-sm">
                Voir le produit
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
