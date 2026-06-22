import type { Role } from "@/types/domain";

import { auth } from "@/auth";

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

export async function requireRole(role: Role) {
  const user = await requireUser();

  if (user.role !== role) {
    throw new Error("Forbidden");
  }

  return user;
}
