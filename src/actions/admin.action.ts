"use server";
import { Booking } from "@/model/Booking";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const updateBookingStatus = async (
  bookingId: string,
  status: string,
  paymentStatus: string
) => {
  try {
    // Convert string ID to MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(bookingId);
    
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: objectId },  // Use the converted ObjectId
      { 
        status,
        paymentStatus,
        updatedAt: new Date() 
      },
      { new: true }  // Return the updated document
    );

    if (!updatedBooking) {
      return { success: false, message: "Booking not found" };
    }

    revalidatePath("/admin/bookings");
    return { 
      success: true, 
      message: "Booking status updated successfully",
      data: updatedBooking 
    };
  } catch (error: any) {
    console.error("Update booking status error:", error);
    return { 
      success: false, 
      message: error.message || "Failed to update booking status" 
    };
  }
};