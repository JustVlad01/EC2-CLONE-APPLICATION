const Restaurant = require('../models/restaurant');
const User = require('../models/User');
const Role = require('../models/roles');
const pageAccessList = require('../routes/pageAccessList');
const PageAccess = require('../models/PageAccess');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const syncPageAccesses = async (restaurantId, ownerRoleId) => {
    const allPageAccesses = [];

    // Loop through actions and create entries for each
    for (const category in pageAccessList.actions) {
        for (const action of pageAccessList.actions[category]) {
            allPageAccesses.push({
                name: action,
                type: 'action', // Optional: distinguish between action and page
                allowedRoles: [ownerRoleId],
                restaurantId: restaurantId
            });
        }
    }

    // Loop through pages and create entries for each
    for (const page of pageAccessList.pages) {
        allPageAccesses.push({
            name: page,
            type: 'page', // Optional: distinguish between action and page
            allowedRoles: [ownerRoleId],
            restaurantId: restaurantId
        });
    }

    // Bulk insert page access entries for the restaurant
    await PageAccess.insertMany(allPageAccesses);
};

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

        // Sync page accesses for the new restaurant
        await syncPageAccesses(newRestaurant._id, ownerRole._id);

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

const getRestaurantData = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id, {
            name: 1,
            phone: 1,
            email: 1,
            website: 1,
            address: 1,
            openingHours: 1,
        });

        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error });
    }
};

module.exports = { createRestaurant, getRestaurantData };
