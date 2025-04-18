import mongoose from "mongoose";
const hallSchema = new mongoose.Schema({
    name: String,
    location: String,
    capacity: Number,
    price: Number,
    images: [String],
    availability: [Date],
    description: String,
  }, { timestamps: true });
  
  export default mongoose.model("Hall", hallSchema);
  