"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth-guards";
import { updateCartQuantity } from "@/lib/mock-store";

export async function updateCartQuantityAction(cartItemId: string, formData: FormData) {
  const user = await requireUser();

  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));

  updateCartQuantity(user.id, cartItemId, quantity);

  revalidatePath("/cart");
}
