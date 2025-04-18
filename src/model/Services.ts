import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["hall", "generator", "catering"], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number },
    images: [{ type: String }],
    availability: [{ type: Date }],
    features: [{ type: String }],
    ratings: [{ type: Number }],
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" }, // Vendor reference
  },
  { timestamps: true }
);

export const Service = model("Service", serviceSchema);
