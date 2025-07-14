const express = require('express');
const router = express.Router();

const { 
  newRooms, 
  existingRoom, 
  getRoomById, 
  privateRooms, 
  deleteRoom,
} = require('../controllers/roomController');
// Create a new room
router.post('/create', newRooms);

// Get all rooms (public + private)
router.get('/getRooms', existingRoom);

// Get only private rooms
router.get('/privateRooms/:_id', privateRooms);

// (Optional) Get only private rooms created by a specific user

// Get a room by ID
router.get('/:id', getRoomById);

// Test route to check if server is running
router.get('/test', (req, res) => {
  res.send('Test route working');
});


// Delete a room
router.delete('/delete/:id', deleteRoom);

module.exports = router;
