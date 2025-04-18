import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Button } from "@/components/Button";
import SignOutButton from "./SignOutButton";

export default async function UserDetail() {
  const session = await getServerSession(authOptions);
  console.log(
    "Test",
    session?.user.name
      .split(" ")
      [session?.user.name.split(" ").length - 1].charAt(0)
  );
  return (
    <div className="w-full md:w-80 bg-white rounded-3xl shadow-xl p-6 h-fit">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl text-purple-600">
            {session?.user?.name.charAt(0) +
              session?.user.name
                .split(" ")
                [session?.user.name.split(" ").length - 1].charAt(0)}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-purple-900">
          {session?.user?.name}
        </h2>
        <p className="text-purple-600">{session?.user?.email}</p>
      </div>
      <div className="space-y-4">
        <Button className="w-full bg-purple-100 text-purple-900 hover:bg-purple-200">
          Edit Profile
        </Button>
        <SignOutButton />
      </div>
    </div>
  );
}
