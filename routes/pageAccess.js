const express = require('express');
const { createPageAccess, getPageAccessByRestaurant, updatePageAccess, deletePageAccess } = require('../controllers/PageAccessController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect these routes using the dynamic middleware
router.post('/create', authMiddleware('PageAccessCreate'), createPageAccess);
router.get('/:restaurantId', authMiddleware('PageAccessList'), getPageAccessByRestaurant);
router.put('/:id', authMiddleware('PageAccessUpdate'), updatePageAccess);
router.delete('/:id', authMiddleware('PageAccessDelete'), deletePageAccess);

module.exports = router;
