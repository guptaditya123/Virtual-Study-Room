const Room = require("../models/room");

// Create new room
exports.newRooms = async (req, res) => {
  const { name, topic, isPrivate, userId } = req.body;
  console.log("Creating room with data:", req.body);

  try {
    const newRoom = new Room({
      name,
      topic,
      isPrivate,
      createdBy: userId,
      members: [userId],
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    console.error("Error while creating room:", err);
    res.status(500).json({ msg: "Failed to create room" });
  }
};

// Get all public rooms
exports.existingRoom = async (req, res) => {
  try {
    const rooms = await Room.find({isPrivate: false});
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch rooms" });
  }
};

// Get room by ID
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

// Delete room (no ownership check)
exports.deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  
  try {
    const room = await Room.findByIdAndDelete(roomId);
    
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("Error deleting room:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// for private rooms
// Get private rooms created by a specific user
exports.privateRooms = async (req, res) => {
  const userId = req.params._id;
  try {
    const rooms = await Room.find({ isPrivate: true, createdBy: userId });
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching private rooms:", err);
    res.status(500).json({ msg: "Failed to fetch private rooms" });
  }
};
