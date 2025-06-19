const express = require('express');
const router = express.Router();

const { newRooms, existingRoom , getRoomById , deleteRoom } = require('../controllers/roomController');

// Create a new room
router.post('/create', newRooms);

// Get all existing rooms
router.get('/getRooms', existingRoom);
router.get("/privateRooms/:id",getRoomById );
router.delete('/delete/:id', deleteRoom)

// ✅ Export the router
module.exports = router;
