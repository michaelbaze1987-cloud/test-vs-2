import Link from "next/link";

import { getAllProducts } from "@/lib/catalog";

export const metadata = {
  title: "Produits",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Catalogue produits</h1>
      <p className="text-slate-600">
        Catalogue public avec pagination et filtres a brancher dans une iteration suivante.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="card overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="h-52 w-full object-cover" />
            <div className="space-y-2 p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
              <p className="font-semibold text-teal-700">{Number(product.price).toFixed(2)} EUR</p>
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
