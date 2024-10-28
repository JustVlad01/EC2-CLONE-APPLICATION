const Restaurant = require('../models/restaurant');
const User = require('../models/User');
const Role = require('../models/roles');
const pageAccessList = require('../routes/pageAccessList');
const PageAccess = require('../models/PageAccess');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new restaurant with an owner
const createRestaurant = async (req, res) => {
    try {
        console.log("Creating restaurant");
        const { restaurant, owner, subscription } = req.body;

        // Check if the owner username or email already exists
        let user = await User.findOne({
            $or: [{ username: owner.username }, { email: owner.email }]
        });

        console.log("Checking if user exists");
        if (user) {
            if (user.username === owner.username) {
                console.log("Owner username already exists");
                return res.status(400).json({ msg: 'Owner username or email already exists' });
            }
            if (user.email === owner.email) {
                console.log("Owner email already exists");
                return res.status(400).json({ msg: 'Owner username or email already exists' });
            }
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(owner.password, salt);

        //Restaurant fields
        const restaurantData = {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phoneNumber,
            email: restaurant.email,
            website: restaurant.website,
            openingHours: restaurant.openingHours,
            cuisineType: restaurant.cuisineType,
        }

        //Check promotion code
        if (subscription.promo === 'PJ300') {
            restaurantData.subscriptionStatus = 'active';
            restaurantData.subscriptionEndDate = new Date(new Date().setDate(new Date().getDate() + 30));
        }

        // Create the restaurant
        const newRestaurant = new Restaurant(
            restaurantData
        );
        await newRestaurant.save();

        // Create the Owner role with priority 1
        const ownerRole = new Role({
            name: 'owner',
            restaurantId: newRestaurant._id,
            priority: 1,
        });
        await ownerRole.save();
        console.log(ownerRole);

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
                role: ownerRole._id,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Set the token in the response
        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        });

        const allPageAccesses = [];

        // Loop through the pageAccessList and create entries for each
        for (const group in pageAccessList) {
            for (const pageName in pageAccessList[group]) {
                allPageAccesses.push({
                    name: pageAccessList[group][pageName],
                    allowedRoles: [ownerRole._id],
                    restaurantId: newRestaurant._id
                });
            }
        }

        // Bulk insert the page access entries
        await PageAccess.insertMany(allPageAccesses);

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
