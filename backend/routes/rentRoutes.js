import express from "express";
import Rent from "../models/Rent.js";
import auth from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =====================================
   TENANT PAY RENT
=====================================*/
router.post("/", auth, async (req, res, next) => {
  try {
    let { roomNumber, amount, month } = req.body;

    // ======================
    // VALIDATION
    // ======================
    if (!roomNumber || !amount || !month) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    amount = Number(amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid rent amount"
      });
    }

    // ======================
    // DUPLICATE MONTH CHECK
    // ======================
    const alreadyPaid = await Rent.findOne({
      paidBy: req.user.id,
      month: month
    });

    if (alreadyPaid) {
      return res.status(409).json({
        success: false,
        message: "Rent already submitted for this month"
      });
    }

    // ======================
    // CREATE RENT
    // ======================
    const rent = await Rent.create({
      roomNumber: roomNumber.trim(),
      amount,
      month: month.trim(),
      paidBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Rent submitted successfully",
      data: rent
    });

  } catch (err) {
    console.error("Rent Submit Error:", err);
    next(err);
  }
});

/* =====================================
   TENANT VIEW OWN RENT HISTORY
=====================================*/
router.get("/my", auth, async (req, res, next) => {
  try {
    const rents = await Rent.find({
      paidBy: req.user.id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: rents.length,
      data: rents
    });

  } catch (err) {
    next(err);
  }
});

/* =====================================
   ADMIN VIEW ALL RENT
=====================================*/
router.get("/", auth, isAdmin, async (req, res, next) => {
  try {
    const rents = await Rent.find()
      .populate("paidBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: rents.length,
      data: rents
    });

  } catch (err) {
    next(err);
  }
});

/* =====================================
   ADMIN DELETE RENT ENTRY
=====================================*/
router.delete("/:id", auth, isAdmin, async (req, res, next) => {
  try {
    const deleted = await Rent.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Rent record not found"
      });
    }

    res.json({
      success: true,
      message: "Rent record deleted successfully"
    });

  } catch (err) {
    next(err);
  }
});

export default router;
