"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth-guards";
import { removeFromCart } from "@/lib/mock-store";

export async function removeFromCartAction(cartItemId: string) {
  const user = await requireUser();

  removeFromCart(user.id, cartItemId);

  revalidatePath("/cart");
}
