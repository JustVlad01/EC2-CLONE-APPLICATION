const express = require('express');
const router = express.Router();
const InvitationController = require('../controllers/InvitationController');
const authMiddleware = require('../middleware/authMiddleware');

// Protects the route with JWT and role-based access
router.post('/create', authMiddleware('CreateInvite'), InvitationController.createInvitation);

module.exports = router;