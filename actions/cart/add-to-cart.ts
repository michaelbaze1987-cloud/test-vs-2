"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth-guards";
import { addToCart } from "@/lib/mock-store";

export async function addToCartAction(productId: string, formData: FormData) {
  const user = await requireUser();

  const quantity = Number(formData.get("quantity") ?? 1);
  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;

  addToCart(user.id, productId, normalizedQuantity);

  revalidatePath("/cart");
}
