import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

/* CREATE ROOM */
router.post("/", async (req, res) => {
  try {
    const { number, capacity } = req.body;

    if (!number || !capacity) {
      return res.status(400).json({
        success: false,
        message: "Room number and capacity required"
      });
    }

    const exists = await Room.findOne({ number });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Room already exists"
      });
    }

    const room = new Room({
      number,
      capacity,
      status: "available"
    });

    await room.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room
    });

  } catch (err) {
    console.error("CREATE ROOM ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating room"
    });
  }
});

/* GET ROOMS */
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });

  } catch (err) {
    console.error("FETCH ROOMS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms"
    });
  }
});

/* UPDATE ROOM */
router.put("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.json({
      success: true,
      message: "Room updated",
      data: room
    });

  } catch (err) {
    console.error("UPDATE ROOM ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update room"
    });
  }
});

/* DELETE ROOM */
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.json({
      success: true,
      message: "Room deleted successfully"
    });

  } catch (err) {
    console.error("DELETE ROOM ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete room"
    });
  }
});

export default router;
