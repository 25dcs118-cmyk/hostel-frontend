import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true
    },

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"]
    },

    month: {
      type: String,
      required: true,
      enum: [
        "JAN","FEB","MAR","APR","MAY","JUN",
        "JUL","AUG","SEP","OCT","NOV","DEC"
      ]
    },

    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear()
    },

    status: {
      type: String,
      enum: ["PAID", "PENDING", "OVERDUE"],
      default: "PAID"
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "UPI", "CARD", "BANK"],
      default: "CASH"
    },

    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

// prevent duplicate rent entry for same room + month + year
rentSchema.index({ roomNumber: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Rent", rentSchema);
