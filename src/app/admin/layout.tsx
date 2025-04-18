import { ReactNode } from "react";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  const user = session?.user;
  console.log(user.role);

  if (!session) {
    redirect("/signin");
  }
  if (user.role !== "admin") {
    redirect("/");
  }
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <div className="flex-1 h-screen overflow-x-auto bg-gray-100">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
