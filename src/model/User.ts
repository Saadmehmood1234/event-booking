
import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

export const MUser = mongoose.models?.MUser || model("MUser", userSchema);
