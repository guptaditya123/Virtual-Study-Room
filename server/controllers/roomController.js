const Room = require("../models/room");

exports.newRooms = async (req, res) => {
  const { name, topic, isPrivate, userId } = req.body;
  console.log("Creating room with data:", req.body); // <-- ADD THIS LINE

  try {
    const newRoom = new Room({
      name,
      topic,
      isPrivate,
      userId,
      createdBy: userId,
      members: [userId],
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    console.error("Error while creating room:", err); // <-- ADD THIS
    res.status(500).json({ msg: "Failed to create room" });
  }
};

exports.existingRoom = async (req, res) => {
  try {
    const rooms = await Room.find({ isPrivate: false });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create room" });
  }
};

exports.getRoomById = async (req, res) => {
  const roomId = req.params.id;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json({
      topic: room.topic,
      name: room.name,
      isPrivate: room.isPrivate,
    });
  } catch (err) {
    console.error("Error fetching room:", err);
    res.status(500).json({ error: "Server error" });
  }
};

