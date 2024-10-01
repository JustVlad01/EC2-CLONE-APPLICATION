const express = require('express');
const router = express.Router();
const { createRestaurant } = require('../controllers/RestaurantController');
const authMiddleware = require('../middleware/authMiddleware');

// Create hotel data and owner profile
router.post("/create", authMiddleware, createRestaurant);

module.exports = router;
