const User = require('../models/User');
const Invitation = require('../models/Invitation');
const Role = require('../models/Roles');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const xss = require("xss");
const rateLimit = require("express-rate-limit");

// Create a new user using an invitation
const createUser = async (req, res) => {
    try {
        const { username, password, email, verificationCode, name, number } = req.body;

        // Validate the invitation code
        const invitation = await Invitation.findOne({ uniqueCode: verificationCode, used: false });
        if (!invitation) {
            return res.status(400).json({ msg: 'Invalid or expired invitation code.' });
        }

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Check if the "staff" role already exists for this restaurant
        let roleToAssign = await Role.findOne({ name: 'staff', restaurantId: invitation.restaurantId });

        // If the "staff" role doesn't exist, create it
        if (!roleToAssign) {
            roleToAssign = new Role({
                name: 'staff',
                restaurantId: invitation.restaurantId,
                priority: 3, // Priority for staff role
            });
            await roleToAssign.save();
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with name and number
        user = new User({
            username,
            password: hashedPassword,
            roleId: roleToAssign._id,
            email,
            restaurantId: invitation.restaurantId,
            name,         // Add name field
            number        // Add number field
        });

        await user.save();

        // Mark the invitation as used
        invitation.used = true;
        await invitation.save();

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: roleToAssign.name,
                restaurantId: user.restaurantId,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' } // Token expiry time
        );

        // Send JWT as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            msg: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                role: roleToAssign.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
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

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('roleId', 'name priority') // Populate role data if needed
            .select('username name email roleId restaurantId'); // Customize fields as needed

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.roleId.name,
            priority: user.roleId.priority
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUserProfile,
    loginRateLimiter
};
