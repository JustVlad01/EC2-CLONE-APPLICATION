const express = require('express');
const router = express.Router();

router.use('/hotel', require("./hotel"))
router.use('/user', require("./user"))

module.exports = router;
