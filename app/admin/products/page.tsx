import Link from "next/link";

import { deleteProductAction } from "@/actions/products/delete-product";
import { getAdminProducts } from "@/lib/mock-store";

export const metadata = {
  title: "Admin Produits",
};

export default async function AdminProductsPage() {
  const products = getAdminProducts();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Produits</h1>
        <Link href="/admin/products/new" className="btn btn-primary text-sm">
          Nouveau produit
        </Link>
      </div>

      <div className="space-y-3">
        {products.map((product) => {
          const deleteAction = deleteProductAction.bind(null, product.id);

          return (
            <article key={product.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-slate-600">
                  {product.category.name} • {Number(product.price).toFixed(2)} EUR
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/admin/products/${product.id}/edit`} className="btn btn-secondary text-sm">
                  Modifier
                </Link>
                <form action={deleteAction}>
                  <button type="submit" className="btn text-sm text-red-700">
                    Supprimer
                  </button>
                </form>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
