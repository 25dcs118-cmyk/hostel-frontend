import express from "express";
import Notice from "../models/Notice.js";
import auth from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create notice (admin)
router.post("/", auth, isAdmin, async (req, res) => {
  const notice = await Notice.create(req.body);
  res.json(notice);
});

// Get all notices (everyone)
router.get("/", auth, async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

// Delete notice (admin)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Notice deleted" });
});

export default router;
