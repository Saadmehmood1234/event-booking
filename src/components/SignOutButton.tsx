"use client";
import { Button } from "@/components/Button";
import { signOut } from "next-auth/react";

export default  function SignOutButton() {
  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <Button
      onClick={handleSignOut}
      className="w-full bg-red-100 text-red-600 hover:bg-red-200"
    >
      Logout
    </Button>
  );
}
