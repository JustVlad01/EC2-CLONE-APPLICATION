const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require("../controllers/UserController");

// Register user
router.post("/create", createUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
