import { Schema, model, models } from "mongoose";
import { string } from "zod";

const bookingSchema = new Schema(
  {
    // service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    service: {
      type: Number,
    },
    serviceName:{
      type:String
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    eventDate: { type: Date },
    guests: { type: Number, min: 1 },
    eventType: {
      type: String,
      enum: ["wedding", "corporate", "birthday", "other"],
    },
    duration: { type: Number, min: 1 },
    customRequests: { type: String, trim: true },
    totalPrice: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);
export const Booking = models.Booking || model("Booking", bookingSchema);
