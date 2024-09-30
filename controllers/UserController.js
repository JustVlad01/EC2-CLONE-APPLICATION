const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, password, role, email } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({ username, password, role: role || 'user', email });

        await user.save();
        return res.status(201).json({ msg: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating user', error });
    }
};

module.exports = {
    createUser,
};
