const express = require('express');
const router = express.Router();
const {createUser, loginUser, getUserProfile} = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

// Register user
router.post("/create", createUser);

// Login user
router.post("/login", loginUser);

//Get user profile
router.get("/profile", authMiddleware(), getUserProfile);

module.exports = router;
