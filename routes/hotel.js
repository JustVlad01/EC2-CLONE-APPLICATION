const express = require('express');
const router = express.Router();
const { createRestaurant, getRestaurantData } = require('../controllers/RestaurantController');
const authMiddleware = require('../middleware/authMiddleware');

// Create hotel data and owner profile
router.post("/create", createRestaurant);

// Get hotel data
router.get("/:id", getRestaurantData);

module.exports = router;
