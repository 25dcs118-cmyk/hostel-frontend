import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  number: String,
  capacity: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Room", RoomSchema);
