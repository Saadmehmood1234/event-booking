import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Joined</th>
            {/* <th className="py-3 px-4 text-left">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-purple-600">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-3 flex justify-start items-center gap-2">
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  {user.name}
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                {/* <td className="py-3 px-4 flex gap-2">
                  <Button variant="outline" size="sm">Edit Role</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
