const express = require('express');
const router = express.Router();
const { createRestaurant } = require('../controllers/RestaurantController');

// Create hotel data and owner profile
router.post("/create", createRestaurant);

module.exports = router;
