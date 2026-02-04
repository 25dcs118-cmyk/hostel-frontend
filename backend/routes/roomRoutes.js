import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

router.get("/", async(req,res)=>{
  const data = await Room.find();
  res.json(data);
});

router.post("/", async(req,res)=>{
  const room = new Room(req.body);
  await room.save();
  res.json(room);
});

export default router;
