const express = require('express');
const router = express.Router();
const User = require("../models/user");

// Register user
router.post("/register", async (req, res) => {
    try {
        // Create a new user instance
        const user = new User({

        });

        // Save user
        const savedUser = await user.save();

        // Send success response
        res.status(201).json({ user: user });
    } catch (error) {
        // Send error response if any error occurs
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
