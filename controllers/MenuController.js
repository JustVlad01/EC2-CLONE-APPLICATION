const Menu = require('../models/Menu');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create a new menu
const createMenu = async (req, res) => {
    try {
        const { restaurantId } = req.body;

        if (!restaurantId) {
            return res.status(400).json({ msg: 'Restaurant ID is required' });
        }

        // Create new menu
        const menu = new Menu({
            restaurantId,
        });

        await menu.save();
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating user', error });
    }
};

module.exports = {
    createMenu,
    getMenus,
    deleteMenu
    
  };