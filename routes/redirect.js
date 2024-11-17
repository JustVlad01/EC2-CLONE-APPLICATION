const express = require('express');
const router = express.Router();
const { redirectToClient } = require("../controllers/redirectController");
const authMiddleware = require('../middleware/authMiddleware');

router.get("/client-redirect", authMiddleware(), redirectToClient);

module.exports = router;
