const express = require('express');
const router = express.Router();
const { createRooms, getRooms, updateRoom, deleteRoom } = require('../controllers/RoomsController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new room
router.post('/', authMiddleware('ManageRooms'), createRooms);

// Get all rooms for the restaurant
router.get('/', authMiddleware('ViewRooms'), getRooms);

// Update an existing room
router.put('/:id', authMiddleware('UpdateRooms'), updateRoom);

// Delete a room
router.delete('/:id', authMiddleware('DeleteRooms'), deleteRoom);

module.exports = router;