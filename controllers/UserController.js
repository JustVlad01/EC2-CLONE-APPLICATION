const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, password, role, email } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        user = new User({ 
            username, 
            password: hashedPassword, 
            role: role || 'staff',
            email, 
        });

        await user.save();

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }   // Token expiry time
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            msg: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating user', error });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT if passwords match
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Send response with token
        return res.status(200).json({
            msg: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error logging in', error });
    }
}

module.exports = {
    createUser,
    loginUser,
};
