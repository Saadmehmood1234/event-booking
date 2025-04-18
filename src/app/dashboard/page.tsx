import DashboardComponent from "@/components/Dashboard";
import UserDetail from "@/components/UserDetail";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <UserDetail />
          <DashboardComponent />
        </div>
      </div>
    </div>
  );
}
