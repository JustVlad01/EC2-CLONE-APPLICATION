const Restaurant = require('../models/Restaurant');
const { createUser } = require('./UserController'); // Import UserController method

const createRestaurant = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, username, address } = req.body;

        // Step 1: Create the owner/admin user first
        const userReq = {
            body: {
                username: username,
                password: password,
                role: 'owner',
                email: email,
            },
        };

        const userRes = {
            status: (code) => ({
                json: (data) => data,
            }), // Mock res to capture data
        };

        const userResult = await createUser(userReq, userRes);
        console.log(userResult);

        if (!userResult.user) {
            return res.status(400).json({ msg: 'Error creating user for restaurant' });
        }

        // Step 2: After user (owner) is created, create the restaurant
        const restaurant = new Restaurant({
            name: name,
            address: address, // Directly assign the address from the request body
            ownerId: userResult.user._id, // Assign the ownerId to the created user's _id
        });

        await restaurant.save();

        return res.status(201).json({
            msg: 'Restaurant created successfully',
            restaurant,
            adminUser: userResult.user,
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating restaurant', error });
    }
};

module.exports = {
    createRestaurant,
};
