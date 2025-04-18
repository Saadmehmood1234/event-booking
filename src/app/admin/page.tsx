"use client";
import { useState, useEffect, useMemo } from "react";
import { User } from "@/lib/types";
import { UsersTable } from "@/components/admin-dashboard/UserColumn";
import { BookingsTable } from "@/components/admin-dashboard/BookingColumn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Users, CalendarCheck, Package,Loader } from "lucide-react";
import { getAllBooking } from "@/actions/register.action";
import { services } from "@/lib/data/Services";
import { ServiceTable } from "@/components/admin-dashboard/ServiceColumn";
import { getUser } from "../../actions/register.action";
import { StatusModal } from "@/components/StatusModal";
import { AnimatePresence, motion } from "framer-motion";
interface Booking {
  _id: string;
  service: number;
  eventDate: Date;
  name:string;
  serviceName:string;
  guests: number;
  eventType: "wedding" | "corporate" | "birthday" | "other";
  duration: number;
  customRequests?: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}
const statCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);


  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => ({
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    activeUsers: users.filter((user) => user.role === "user").length,
    totalServices: services.length,
  }), [bookings, users]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bookingsResponse, usersResponse] = await Promise.all([
          getAllBooking(),
          getUser()
        ]);

        if (bookingsResponse.success) setBookings(bookingsResponse.data || []);
        if (usersResponse.success) setUsers(usersResponse.data || []);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {['totalBookings', 'activeUsers', 'totalServices'].map((stat, index) => (
            <motion.div
              key={stat}
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-purple-600">
                    {stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </CardTitle>
                  {loading ? (
                    <Loader className="h-4 w-4 text-purple-300 animate-spin" />
                  ) : (
                    {
                      totalBookings: <CalendarCheck className="h-5 w-5 text-purple-500" />,
                      // totalRevenue: <IndianRupee className="h-5 w-5 text-purple-500" />,
                      activeUsers: <Users className="h-5 w-5 text-purple-500" />,
                      totalServices: <Package className="h-5 w-5 text-purple-500" />,
                    }[stat]
                  )}
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-8 bg-purple-100 rounded animate-pulse" />
                  ) : (
                    <div className="text-2xl font-bold text-purple-900 flex items-center">
                      {stat === 'totalRevenue' && <IndianRupee className="h-5 w-5 mr-1" />}
                      {stat === 'totalRevenue' 
                        ? stats.totalRevenue.toLocaleString()
                        : stats[stat as keyof typeof stats]}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="bg-purple-50 p-1 h-auto rounded-xl gap-2 border border-purple-100">
            {['bookings', 'users', 'services'].map((tab,index) => (
              <TabsTrigger
                key={index}
                value={tab}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg px-6 py-2 transition-all"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* <AnimatePresence mode="wait" key="hello"> */}
            <TabsContent value="bookings" className="mt-6">
              <motion.div
              key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-purple-100 shadow-sm">
                  <CardContent className="p-6">
                    <BookingsTable bookings={bookings} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <motion.div
               key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-purple-100 shadow-sm">
                  <CardContent className="p-6">
                    <UsersTable users={users} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <motion.div
               key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-purple-100 shadow-sm">
                  <CardContent className="p-6">
                    <ServiceTable services={services} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          {/* </AnimatePresence> */}
        </Tabs>
       
      </div>
    </div>
  );
}
