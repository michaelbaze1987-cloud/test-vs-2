"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth-guards";
import { createOrderFromCart } from "@/lib/mock-store";

export async function createOrderFromCartAction() {
  const user = await requireUser();

  const order = createOrderFromCart(user.id);

  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/admin/orders");
  revalidatePath("/orders");

  redirect(`/orders?placed=${order.id}`);
}
