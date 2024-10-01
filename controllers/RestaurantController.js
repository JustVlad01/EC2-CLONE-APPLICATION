const Restaurant = require('../models/Restaurant');
const { createUser } = require('./UserController'); // Import UserController method
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createRestaurant = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, username, address } = req.body;

        // Step 1: Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Step 2: Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Step 3: Create the owner/admin user
        user = new User({
            username,
            password: hashedPassword,
            role: 'owner',
            email,
        });
        await user.save();

        // Step 4: Generate JWT for the owner
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,    
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        //Step 5: Create the restaurant
        const restaurant = new Restaurant({
            name,
            address,
            ownerId: user._id,
        });
        await restaurant.save();

        return res.status(201).json({
            msg: 'Restaurant created successfully',
            restaurant,
            owner: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating restaurant', error });
    }
};

module.exports = {
    createRestaurant,
};
