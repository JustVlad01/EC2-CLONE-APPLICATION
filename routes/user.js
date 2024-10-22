const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

// Register user
router.post("/create", authMiddleware("owner"), createUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
