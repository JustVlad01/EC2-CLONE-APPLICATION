const Role = require('../models/roles');

const createRole = async (req, res) => {
    const { name, priority } = req.body;

    try {
        // Create a new role for the restaurant
        const newRole = new Role({
            name,
            restaurantId: req.user.restaurantId, // Ensure the role is tied to the restaurant
            priority // Priority should be passed by the user or set accordingly
        });

        await newRole.save();
        res.status(201).json({ msg: 'Role created successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

module.exports = { createRole };