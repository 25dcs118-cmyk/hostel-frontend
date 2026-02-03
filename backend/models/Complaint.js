import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);
