const express = require('express');
const router = express.Router();

router.use('/hotel', require("./hotel"))
router.use('/user', require("./user"))
router.use('/menu', require("./menu"))
router.use('/roles', require("./roles"))
router.use('/invitation', require("./invitation"))
router.use('/pageAccess', require("./pageAccess"))

module.exports = router;
