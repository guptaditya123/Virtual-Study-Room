const express = require('express');
const router = express.Router();

const { newRooms, existingRoom , getRoomById } = require('../controllers/roomController');

// Create a new room
router.post('/create', newRooms);

// Get all existing rooms
router.get('/getRooms', existingRoom);
router.get("/:id",getRoomById );

// ✅ Export the router
module.exports = router;
