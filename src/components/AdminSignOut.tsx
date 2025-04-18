"use client";
import { Button } from "@/components/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default  function AdminSignOut() {
  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <button onClick={handleSignOut} className="p-2 rounded-lg cursor-pointer transition-colors flex flex-col justify-center items-center gap-1">
      <LogOut className="w-6 h-6 text-amber-400 hover:text-amber-200" />
      <span className="text-amber-400">Log Out</span>
    </button>
  );
}
