const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const xss = require("xss");
const rateLimit = require("express-rate-limit");

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

// Apply rate limiting (middleware to limit requests)
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
});

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate user input to avoid XSS or injection attacks
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please provide both username and password' });
        }

        // Sanitize user input to avoid XSS
        const sanitizedUsername = xss(username);
        const sanitizedPassword = xss(password);

        // Find user by username
        const user = await User.findOne({ username: sanitizedUsername });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid credentials' }); // Standardized error message
        }

        // Check password with bcrypt (use async version)
        const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ msg: 'Invalid credentials' }); // Standardized error message
        }

        // Generate a more secure JWT token with a stronger key and token ID
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' } // Token expiration
        );

        // Send the token securely as a cookie
        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send a response without including sensitive user information
        return res.status(200).json({
            msg: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            }
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error during login', error: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    loginRateLimiter
};
