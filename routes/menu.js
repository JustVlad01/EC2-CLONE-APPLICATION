const express = require('express');
const router = express.Router();
const {createMenu} = require("../controllers/MenuController");
const authMiddleware = require('../middleware/authMiddleware');

// Register user
router.post("/create", authMiddleware("CreateMenu"), createMenu);

module.exports = router;
