import type { ProductView } from "@/types/domain";

import { createProductAction } from "@/actions/products/create-product";
import { updateProductAction } from "@/actions/products/update-product";

type EditableProduct = ProductView & {
  categoryName?: string;
};

type ProductFormProps = {
  product?: EditableProduct;
};

export function ProductForm({ product }: ProductFormProps) {
  const action = product
    ? updateProductAction.bind(null, product.id)
    : createProductAction;

  return (
    <form action={action} className="card space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nom produit
          </label>
          <input className="field" id="name" name="name" defaultValue={product?.name} required />
        </div>

        <div className="space-y-1">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug
          </label>
          <input className="field" id="slug" name="slug" defaultValue={product?.slug} required />
        </div>

        <div className="space-y-1">
          <label htmlFor="categoryName" className="text-sm font-medium">
            Categorie
          </label>
          <input className="field" id="categoryName" name="categoryName" defaultValue={product?.categoryName} required />
        </div>

        <div className="space-y-1">
          <label htmlFor="price" className="text-sm font-medium">
            Prix de vente (EUR)
          </label>
          <input className="field" id="price" name="price" type="number" step="0.01" min="0" defaultValue={product ? Number(product.price) : undefined} required />
        </div>

        <div className="space-y-1">
          <label htmlFor="stock" className="text-sm font-medium">
            Stock virtuel
          </label>
          <input className="field" id="stock" name="stock" type="number" min="0" defaultValue={product?.stock ?? 0} required />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="imageUrl" className="text-sm font-medium">
            URL image
          </label>
          <input className="field" id="imageUrl" name="imageUrl" type="url" defaultValue={product?.imageUrl} required />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            className="field min-h-28"
            id="description"
            name="description"
            defaultValue={product?.description}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="supplier" className="text-sm font-medium">
            Fournisseur
          </label>
          <input className="field" id="supplier" name="supplier" defaultValue={product?.supplierProduct?.supplier ?? "AliExpress"} required />
        </div>

        <div className="space-y-1">
          <label htmlFor="supplierExternalId" className="text-sm font-medium">
            Reference fournisseur
          </label>
          <input
            className="field"
            id="supplierExternalId"
            name="supplierExternalId"
            defaultValue={product?.supplierProduct?.externalId ?? "manual-entry"}
            required
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="costPrice" className="text-sm font-medium">
            Cout fournisseur (EUR)
          </label>
          <input
            className="field"
            id="costPrice"
            name="costPrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.supplierProduct ? Number(product.supplierProduct.costPrice) : 0}
            required
          />
        </div>
      </div>

      <button className="btn btn-primary" type="submit">
        {product ? "Mettre a jour le produit" : "Creer le produit"}
      </button>
    </form>
  );
}
