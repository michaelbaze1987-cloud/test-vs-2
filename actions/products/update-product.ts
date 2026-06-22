"use server";

import { revalidateTag } from "next/cache";

import { requireRole } from "@/lib/auth-guards";
import { updateProduct } from "@/lib/mock-store";
import { saveUploadedAsset } from "@/lib/storefront-config";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/validators/product";

export async function updateProductAction(productId: string, formData: FormData) {
  await requireRole("ADMIN");

  const imageFile = formData.get("imageFile");
  const uploadedImageUrl =
    imageFile instanceof File && imageFile.size > 0
      ? await saveUploadedAsset(imageFile, `product-${productId}`)
      : "";

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

  const imageUrl = uploadedImageUrl || parsed.data.imageUrl || "";

  if (!imageUrl) {
    throw new Error("Ajoutez une image produit via URL ou fichier.");
  }

  const categorySlug = slugify(parsed.data.categoryName);

  updateProduct(productId, {
    name: parsed.data.name,
    slug: slugify(parsed.data.slug),
    description: parsed.data.description,
    imageUrl,
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
