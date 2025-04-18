"use server";
import { dbConnect } from "@/lib/dbConnect";
import { Booking } from "@/model/Booking";
import { MUser } from "@/model/User";
import mongoose from "mongoose";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
export const createBooking = async (data: any) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      sucess: false,
      message: "SignIn to continue",
      status: 404,
    };
  }
  try {
    await dbConnect();
    console.log("Test data",data);
    const booking = new Booking({
      service: data.serviceId,
      serviceName: data.serviceName,
      eventDate: data.eventDate,
      guests: data.guest,
      name:session.user.name,
      Phone: data.phone,
      email: session.user.email,
      eventType: data.eventType,
      duration: data.duration,
      customRequests: data.customRequests,
      totalPrice: data.totalPrice,
    });
    await booking.save();
    return { success: true };
  } catch (error: any) {
    console.error("Booking error:", error);
    return { success: false, error: error.message };
  }
};

export const getBooking = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      sucess: false,
      message: "User not found",
      status: 404,
    };
  }
  try {
    await dbConnect();
    const bookings = await Booking.find({email:session?.user?.email}).lean();

    return {
      success: true,
      data: bookings.map((booking) => ({
        _id: (booking._id as mongoose.Types.ObjectId).toString(),
        service: booking.service,
        eventDate: new Date(booking.eventDate),
        guests: booking.guests,
        eventType: booking.eventType,
        name: booking.name,
        serviceName: booking.serviceName,
        duration: booking.duration,
        customRequests: booking.customRequests || "",
        totalPrice: booking.totalPrice,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        createdAt: new Date(booking.createdAt),
        updatedAt: new Date(booking.updatedAt),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
export const getAllBooking = async () => {
 
  try {
    await dbConnect();
    const bookings = await Booking.find().lean();

    return {
      success: true,
      data: bookings.map((booking) => ({
        _id: (booking._id as mongoose.Types.ObjectId).toString(),
        service: booking.service,
        eventDate: new Date(booking.eventDate),
        guests: booking.guests,
        eventType: booking.eventType,
        name: booking.name,
        serviceName: booking.serviceName,
        duration: booking.duration,
        customRequests: booking.customRequests || "",
        totalPrice: booking.totalPrice,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        createdAt: new Date(booking.createdAt),
        updatedAt: new Date(booking.updatedAt),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
export const cancelBooking = async (id: string) => {
  try {
    console.log("My id:", id);
    const objectId = new mongoose.Types.ObjectId(id);
    
    // Updating the booking's status to "cancelled" instead of deleting it
    const cancelData = await Booking.updateOne(
      { _id: objectId },
      { $set: { status: "cancelled" } }
    );
    
    console.log("Cancel result:", cancelData);
    // Use modifiedCount to check if any document was modified
    if (cancelData.modifiedCount === 0) {
      return { success: false, message: "No booking found with this ID." };
    }
    return { success: true, message: "Booking cancelled successfully." };
  } catch (error: any) {
    console.error("Cancel error:", error);
    return { success: false, error: error.message };
  }
};


export const getUser = async () => {
  try {
    await dbConnect();
    const users = await MUser.find().lean(); // Convert Mongoose docs to plain objects

    return {
      success: true,
      data: users.map((user) => ({
        _id: (user._id as mongoose.Types.ObjectId).toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || "",
        createdAt: new Date(user.createdAt).toISOString(), // Convert Date to string
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
