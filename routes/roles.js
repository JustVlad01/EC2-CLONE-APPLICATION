const express = require('express');
const router = express.Router();
const { createRole } = require('../controllers/RoleController');
const authMiddleware = require("../middleware/authMiddleware");

// Create role
router.post("/create", authMiddleware("CreateRole"), createRole);

module.exports = router;
