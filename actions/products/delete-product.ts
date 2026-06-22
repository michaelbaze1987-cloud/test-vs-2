"use server";

import { revalidateTag } from "next/cache";

import { requireRole } from "@/lib/auth-guards";
import { deleteProduct } from "@/lib/mock-store";

export async function deleteProductAction(productId: string) {
  await requireRole("ADMIN");

  deleteProduct(productId);

  revalidateTag("products");
  revalidateTag("categories");
}
