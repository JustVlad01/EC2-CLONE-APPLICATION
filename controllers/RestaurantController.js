const Restaurant = require('../models/restaurant');
const User = require('../models/User');
const Role = require('../models/roles');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new restaurant with an owner
const createRestaurant = async (req, res) => {
    try {
        const { restaurant, owner, subscription } = req.body;

        // Check if the owner username already exists
        let user = await User.findOne({ username: owner.username });
        if (user) {
            return res.status(400).json({ msg: 'Owner username already exists' });
        }

        // Hash the owner's password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(owner.password, saltRounds);

        // Create the restaurant
        const newRestaurant = new Restaurant({
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phoneNumber,
            email: restaurant.email,
            website: restaurant.website,
            openingHours: restaurant.openingHours,
            cuisineType: restaurant.cuisineType,
        });
        await newRestaurant.save();

        // Create the Owner role with priority 1
        const ownerRole = new Role({
            name: 'owner',
            permissions: [], // Define the permissions for the owner role
            restaurantId: newRestaurant._id,
            priority: 1,
        });
        await ownerRole.save();

        // Create the owner user
        user = new User({
            name: owner.name,
            username: owner.username,
            password: hashedPassword,
            roleId: ownerRole._id,
            email: owner.email,
            number: owner.phoneNumber,
            restaurantId: newRestaurant._id,
        });
        await user.save();

        // Create JWT token for owner
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: 'owner',
                restaurantId: newRestaurant._id,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Set the token in the response
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.status(201).json({
            msg: 'Restaurant and owner created successfully',
            restaurant: newRestaurant,
            owner: {
                id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error });
    }
};

module.exports = { createRestaurant };
