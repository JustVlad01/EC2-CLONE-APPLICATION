const express = require('express');
const router = express.Router();

router.use('/hotel', require("./hotel"))
router.use('/user', require("./user"))
router.use('/menu', require("./menu"))
router.use('/roles', require("./roles"))

module.exports = router;
