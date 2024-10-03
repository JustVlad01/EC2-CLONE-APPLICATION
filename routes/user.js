const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

// Register user
router.post("/create", createUser);

// Login user
router.post("/login", authMiddleware("owner"), loginUser);

module.exports = router;
