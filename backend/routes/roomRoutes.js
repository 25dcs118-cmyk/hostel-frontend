import express from "express";
import Room from "../models/Room.js";
import auth from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  res.json(await Room.find());
});

router.post("/", auth, isAdmin, async (req, res) => {
  res.json(await Room.create(req.body));
});

export default router;
