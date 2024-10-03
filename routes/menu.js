const express = require('express');
const router = express.Router();
const {createMenu} = require("../controllers/MenuController");

// Register user
router.post("/create", createMenu);

module.exports = router;
