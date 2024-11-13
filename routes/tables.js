const express = require('express');
const router = express.Router();
const { createTable, getTables, updateTable, deleteTable } = require('../controllers/TablesController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new table
router.post('/', authMiddleware('ManageTables'), createTable);

// Get all tables for the restaurant
router.get('/', authMiddleware('ViewTables'), getTables);

// Update an existing table
router.put('/:id', authMiddleware('UpdateTable'), updateTable);

// Delete a table
router.delete('/:id', authMiddleware('DeleteTable'), deleteTable);

module.exports = router;