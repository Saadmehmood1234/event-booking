"use client";

import { useEffect, useState } from "react";
import { IndianRupee, X } from "lucide-react";
import { getBooking } from "@/actions/register.action";
import { services } from "@/lib/data/Services";

interface Booking {
  _id: string;
  service: number;
  eventDate: Date;
  guests: number;
  eventType: "wedding" | "corporate" | "birthday" | "other";
  duration: number;
  customRequests?: string;
  totalPrice?: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

type BookingDataProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  booking: any;
};

export default function BookingDetails({
  showDetail,
  setShowDetail,
  booking,
}: BookingDataProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBooking();
      if (response.success) {
        setBookings(response.data || []);
      }
    };
    fetchData();
  }, []);

  const getServiceDetails = (id: number) => {
    return services.find((s) => s.id === id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-900 mb-6">All Bookings</h2>
      <div className="space-y-6">
        {bookings.map((booking) => {
          const service = getServiceDetails(booking.service);

          return (
            <div
              key={booking._id}
              className="border relative border-purple-100 rounded-2xl p-6 shadow-md bg-white"
            >
              <X
                onClick={() => setShowDetail(!showDetail)}
                className=" absolute right-2 -top-0 cursor-pointer hover:text-red-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service?.image && (
                  <div className="md:col-span-2">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-60 object-cover rounded-xl shadow-sm"
                    />
                  </div>
                )}

                <div>
                  <p className="text-sm text-purple-600">Service</p>
                  <p className="font-medium text-gray-600">{service?.name || "Unknown"}</p>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Event Date</p>
                  <p className=" text-gray-600">
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Event Type</p>
                  <p className=" text-gray-600 capitalize">{booking.eventType}</p>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Guests</p>
                  <p className=" text-gray-600">{booking.guests}</p>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Duration (hrs)</p>
                  <p className=" text-gray-600">{booking.duration}</p>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Total Price</p>
                  <p className=" text-gray-600 flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {booking.totalPrice?.toLocaleString() || "0"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Booking Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm  text-gray-600 ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-purple-600">Payment Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm  text-gray-600 ${
                      booking.paymentStatus === "completed"
                        ? "bg-green-100 text-green-800"
                        : booking.paymentStatus === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>

                {booking.customRequests && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-purple-600">Custom Requests</p>
                    <p className=" text-gray-600">{booking.customRequests}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
