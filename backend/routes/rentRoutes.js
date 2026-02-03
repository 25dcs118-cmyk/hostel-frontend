import express from "express";
import Complaint from "../models/Complaint.js";
import auth from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Tenant: submit complaint
router.post("/", auth, async (req, res) => {
  const complaint = await Complaint.create({
    subject: req.body.subject,
    description: req.body.description,
    status: "Pending"
  });
  res.json(complaint);
});

// Admin: view all complaints
router.get("/", auth, isAdmin, async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

// Admin: update complaint status
router.put("/:id", auth, isAdmin, async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

export default router;
