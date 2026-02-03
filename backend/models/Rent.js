import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
  room: String,
  amount: Number,
  month: String
});

export default mongoose.model("Rent", rentSchema);
