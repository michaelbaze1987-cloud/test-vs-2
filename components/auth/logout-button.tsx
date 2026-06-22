"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        void signOut({ callbackUrl: "/" });
      }}
    >
      Deconnexion
    </button>
  );
}
