"use server";

import { revalidateTag } from "next/cache";

import { requireRole } from "@/lib/auth-guards";
import { updateProduct } from "@/lib/mock-store";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/validators/product";

export async function updateProductAction(productId: string, formData: FormData) {
  await requireRole("ADMIN");

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    categoryName: formData.get("categoryName"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    supplier: formData.get("supplier"),
    supplierExternalId: formData.get("supplierExternalId"),
    costPrice: formData.get("costPrice"),
  });

  if (!parsed.success) {
    throw new Error("Formulaire produit invalide");
  }

  const categorySlug = slugify(parsed.data.categoryName);

  updateProduct(productId, {
    name: parsed.data.name,
    slug: slugify(parsed.data.slug),
    description: parsed.data.description,
    imageUrl: parsed.data.imageUrl,
    price: parsed.data.price,
    stock: parsed.data.stock,
    categoryName: parsed.data.categoryName,
    categorySlug,
    supplier: parsed.data.supplier,
    supplierExternalId: parsed.data.supplierExternalId,
    costPrice: parsed.data.costPrice,
  });

  revalidateTag("products");
  revalidateTag("categories");
}
