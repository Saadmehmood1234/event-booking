"use client";
import CancelBookingModal from "./CancelBookingModal"; // Adjust path as needed
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { IndianRupee } from "lucide-react";
import { cancelBooking, getBooking } from "@/actions/register.action";
import { services } from "@/lib/data/Services";
import BookingDetails from "./BookingDetail";
import toast from "react-hot-toast";

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

export default function DashboardComponent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [visibleCount, setVisibleCount] = useState(3);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBooking();
      if (response.success) {
        setBookings(response.data || []);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.eventDate);
    if (activeTab === "upcoming") {
      return bookingDate >= now;
    } else if (activeTab === "past") {
      return bookingDate < now;
    } else if (activeTab === "cancelled") {
      return booking.status === "cancelled";
    }
    return false;
  });

  const visibleBookings = filteredBookings.slice(0, visibleCount);

  const getServiceName = (id: number) => {
    const service = services.find((s) => s.id === id);
    return service ? service.name : "Unknown Service";
  };

  const getServicePrice = (id: number) => {
    const service = services.find((s) => s.id === id);
    return service ? service.price : 0;
  };

  const getServiceImage = (id: number) => {
    const service = services.find((s) => s.id === id);
    return service?.image || "/placeholder.jpg";
  };

  const handlePropsSend = (booking: Booking) => {
    setShowDetail((prev) => !prev);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;

    const res = await cancelBooking(selectedBookingId);
    if (res.success) {
      toast("Booking Cancelled Successfully");
    }
    setBookings((prev) =>
      prev.map((b) =>
        b._id === selectedBookingId ? { ...b, status: "cancelled" } : b
      )
    );

    setIsModalOpen(false);
    setSelectedBookingId(null);
  };

  return (
    <div className="flex-1">
      {!showDetail ? (
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-8">My Bookings</h1>
          <div className="flex gap-4 mb-8 border-b border-purple-100">
            <button
              onClick={() => {
                setActiveTab("upcoming");
                setVisibleCount(3);
              }}
              className={`pb-2 px-4 ${
                activeTab === "upcoming"
                  ? "border-b-2 border-purple-600 text-purple-900"
                  : "text-purple-600"
              }`}
            >
              Upcoming (
              {bookings.filter((b) => new Date(b.eventDate) >= now).length})
            </button>
            <button
              onClick={() => {
                setActiveTab("past");
                setVisibleCount(3);
              }}
              className={`pb-2 px-4 ${
                activeTab === "past"
                  ? "border-b-2 border-purple-600 text-purple-900"
                  : "text-purple-600"
              }`}
            >
              Past ({bookings.filter((b) => new Date(b.eventDate) < now).length})
            </button>
            <button
              onClick={() => {
                setActiveTab("cancelled");
                setVisibleCount(3);
              }}
              className={`pb-2 px-4 ${
                activeTab === "cancelled"
                  ? "border-b-2 border-purple-600 text-purple-900"
                  : "text-purple-600"
              }`}
            >
              Cancelled ({bookings.filter((b) => b.status === "cancelled").length})
            </button>
          </div>

          <div className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-purple-600">
                No {activeTab} bookings found
              </div>
            ) : (
              <>
                {visibleBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-48 relative rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={getServiceImage(booking.service)}
                          alt={getServiceName(booking.service)}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-purple-900 mb-2">
                          {getServiceName(booking.service)}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-purple-600">Date</p>
                            <p className="font-medium">
                              {new Date(booking.eventDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-purple-600">Guests</p>
                            <p className="font-medium">{booking.guests}</p>
                          </div>
                          <div>
                            <p className="text-sm text-purple-600">Status</p>
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
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
                            <p className="text-sm text-purple-600">Amount</p>
                            <p className="font-medium flex items-center">
                              <IndianRupee className="h-4 w-4 mr-1" />
                              {booking.totalPrice
                                ? booking.totalPrice.toLocaleString()
                                : (
                                    booking.duration *
                                    getServicePrice(booking.service)
                                  ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            onClick={() => handlePropsSend(booking)}
                            className="border-purple-200 cursor-pointer text-purple-900"
                          >
                            View Details
                          </Button>
                          {activeTab === "upcoming" && (
                            <Button
                              onClick={() => {
                                setSelectedBookingId(booking._id);
                                setIsModalOpen(true);
                              }}
                              variant="outline"
                              className="border-red-200 cursor-pointer text-red-600"
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredBookings.length > visibleCount && (
                  <div className="text-center pt-6">
                    <Button
                      onClick={() => setVisibleCount((prev) => prev + 3)}
                      className="bg-purple-600 cursor-pointer text-white hover:bg-purple-700"
                    >
                      Show More
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          <CancelBookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleCancelBooking}
          />
        </div>
      ) : (
        <BookingDetails
          booking={bookingData}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
        />
      )}
    </div>
  );
}
