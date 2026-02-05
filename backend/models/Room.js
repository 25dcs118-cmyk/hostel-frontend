import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Room", roomSchema);
  