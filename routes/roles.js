const express = require('express');
const router = express.Router();
const { createRole } = require('../controllers/RoleController');
const authMiddleware = require("../middleware/authMiddleware");

// Register user
router.post("/create", authMiddleware("owner"), createRole);

module.exports = router;
