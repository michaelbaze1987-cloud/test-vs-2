import Link from "next/link";

import { getProductsByCategorySlug } from "@/lib/catalog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryProductsPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const products = await getProductsByCategorySlug(slug);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Categorie: {slug}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="card p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-slate-600">{product.description.slice(0, 100)}...</p>
            <p className="font-medium text-teal-700">{Number(product.price).toFixed(2)} EUR</p>
            <Link href={`/products/${product.slug}`} className="btn btn-secondary mt-3 text-sm">
              Voir la fiche
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
