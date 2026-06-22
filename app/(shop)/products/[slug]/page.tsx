import { notFound } from "next/navigation";

import { addToCartAction } from "@/actions/cart/add-to-cart";
import { getProductBySlug } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const addAction = addToCartAction.bind(null, product.id);

  return (
    <article className="card overflow-hidden lg:grid lg:grid-cols-[1.2fr_1fr]">
      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />

      <div className="space-y-5 p-6">
        <p className="badge">{product.category.name}</p>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-slate-600">{product.description}</p>

        <div className="space-y-2 border-y border-slate-200 py-4">
          <p className="text-2xl font-semibold text-teal-700">{Number(product.price).toFixed(2)} EUR</p>
          <p className="text-sm text-slate-600">Stock fournisseur: {product.stock}</p>
          <p className="text-xs text-slate-500">Fournisseur: {product.supplierProduct?.supplier ?? "N/A"}</p>
        </div>

        <form action={addAction} className="space-y-3">
          <label className="block space-y-1 text-sm font-medium" htmlFor="quantity">
            Quantite
            <input className="field" id="quantity" name="quantity" type="number" min={1} defaultValue={1} />
          </label>
          <button className="btn btn-primary w-full" type="submit">
            Ajouter au panier
          </button>
        </form>
      </div>
    </article>
  );
}
