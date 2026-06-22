"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth-guards";
import { createOrderFromCart } from "@/lib/mock-store";

export async function createOrderFromCartAction() {
  const user = await requireUser();

  createOrderFromCart(user.id);

  revalidatePath("/cart");
  revalidatePath("/admin/orders");
}
