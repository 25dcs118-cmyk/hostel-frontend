import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  number: String,
  capacity: Number,
  booked: { type: Boolean, default: false }
});

export default mongoose.model("Room", roomSchema);
