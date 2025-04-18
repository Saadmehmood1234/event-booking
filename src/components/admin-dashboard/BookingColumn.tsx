"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";
import { cancelBooking } from "@/actions/register.action";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import { StatusModal } from "../StatusModal";
import { updateBookingStatus } from "@/actions/admin.action";
interface BookingsTableProps {
  bookings: Booking[];
}

interface Booking {
  _id: string;
  service: number;
  eventDate: Date;
  name: string;
  serviceName: string;
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

export function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = async () => {
    if (selectedBooking) {
      const toastId = toast.loading("Deleting booking...");
      // try {
      //   await cancelBooking(selectedBooking);
      //   toast.success("Booking deleted successfully!", { id: toastId });
      //   setSelectedBooking(null);
      //   router.refresh();
      // } catch (error) {
      //   toast.error("Failed to delete booking!", { id: toastId });
      // }
    }
  };
  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleStatusChange = async (status: string, paymentStatus: string) => {
    if (!selectedBooking) return;

    const toastId = toast.loading("Updating booking status...");
    try {
      const result = await updateBookingStatus(
        selectedBooking._id, // Correct order: bookingId first
        status,
        paymentStatus
      );

      if (result.success) {
        toast.success(result.message, { id: toastId });
        router.refresh(); // Refresh the page to show updated data
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to update booking status", { id: toastId });
      console.error("Update error:", error);
    } finally {
      setIsModalOpen(false);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Service</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Event Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-purple-600">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="py-3 px-4">{booking.serviceName}</td>
                <td className="py-3 px-4">{booking.name}</td>
                <td className="py-3 px-4">
                  {new Date(booking.eventDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant={
                      booking.status === "confirmed" ? "success" : "warning"
                    }
                  >
                    {booking.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  {/* <Button variant="outline" size="sm">
                    Edit
                  </Button> */}
                  <Button
                    variant="default"
                    onClick={() => openModal(booking)}
                    size="sm"
                    className="hover:bg-green-400 cursor-pointer"
                  >
                    <Edit />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedBooking && (
        <StatusModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen} // Correct prop for controlling modal visibility
          onSubmit={handleStatusChange}
          currentStatus={selectedBooking.status}
          currentPaymentStatus={selectedBooking.paymentStatus}
        />
      )}
    </div>
  );
}
