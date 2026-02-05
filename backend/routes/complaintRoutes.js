import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

/* ADD COMPLAINT */
router.post("/", async (req, res) => {
  try {
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const complaint = await Complaint.create({
      subject,
      description
    });

    res.status(201).json(complaint);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* GET ALL COMPLAINTS */
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
