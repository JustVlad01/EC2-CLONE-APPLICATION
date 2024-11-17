const express = require('express');
const router = express.Router();
const {createMenu, getMenuById, updateMenu, deleteMenu, getMenusAvailableNow, getAllMenusByRestaurant} = require("../controllers/MenuController");
const authMiddleware = require('../middleware/authMiddleware');

// Create a menu
router.post('/create', authMiddleware('CreateMenu'), createMenu);

// Update a menu
router.put('/update/:id', authMiddleware('UpdateMenu'), updateMenu);

// Get a menu by ID
router.get('/:id', authMiddleware('ViewMenu'), getMenuById);

// Delete a menu
router.delete('/delete/:id', authMiddleware('DeleteMenu'), deleteMenu);

// Retrieve all menus for a specific hotel (admin and client side)
router.get('/hotel/:hotelId', authMiddleware('ViewMenuAdmin'), getAllMenusByRestaurant);

// Retrieve all menus available right now based on time range (no restrictions)
router.get('/:restaurantId/available-now', getMenusAvailableNow);

module.exports = router;
