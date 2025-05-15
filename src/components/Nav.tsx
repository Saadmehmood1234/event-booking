import React from "react";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  Rocket,
  LayoutDashboard,
  UserCircle,
  Contact,
  LogIn,
  LogOut,
} from "lucide-react";
import AdminSignOut from "./AdminSignOut";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const user = session.user;
  const admin = session?.user?.role === "admin";
  console.log(admin);
  console.log("Session", session.user);
  return (
    <header className="w-full border-b-4 border-amber-400 flex justify-between items-center h-20 bg-gradient-to-br from-purple-800 to-indigo-900 shadow-md px-8">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-amber-400" />
          <span className="text-xl font-bold text-gray-200">EventEase</span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        {admin && (
          <Link href="/admin">
            {" "}
            <button className="p-2 rounded-lg cursor-pointer transition-colors flex flex-col justify-center items-center gap-1">
              <Contact className="w-6 h-6 text-amber-400 hover:text-amber-200" />
              <span className="text-amber-400">Admin</span>
            </button>
          </Link>
        )}
        {admin && <AdminSignOut />}

        {!admin && (
          <Link href="/dashboard">
            {" "}
            <button className="p-2 rounded-lg cursor-pointer transition-colors flex flex-col justify-center items-center gap-1">
              <LayoutDashboard className="w-6 h-6 text-amber-400 hover:text-amber-200 " />
              <span className="text-amber-400">Dashboard</span>
            </button>
          </Link>
        )}

        <div className="flex items-center gap-3 cursor-pointer group">
          {session.user?.image ? (
            <div className="flex flex-col justify-center items-center gap-1">
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex max-sm:hidden items-center gap-1">
                <span className="text-amber-400 font-medium">
                  {session.user?.name || "Account"}
                </span>
                {/* <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" /> */}
              </div>
            </div>
          ) : (
            <UserCircle className="w-8 h-8 text-amber-400" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
