const Table = require('../models/Tables');

const createTable = async (req, res) => {
    try {
        const { number, capacity, type } = req.body;
        const restaurantId = req.user.restaurantId; // Retrieved from the middleware

        const newTable = new Table({
            restaurantId,
            number,
            capacity,
            type,
        });

        await newTable.save();
        res.status(201).json({ message: 'Table created successfully', table: newTable });
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(400).json({ error: 'Failed to create table', details: error.message });
    }
};

const getTables = async (req, res) => {
    try {
        let { restaurantId } = req.params;

        if (!restaurantId) {
            if (!req.user || !req.user.restaurantId) {
                return res.status(400).json({ error: 'Restaurant ID is required' });
            }
            restaurantId = req.user.restaurantId;
        }

        console.log('restaurantId', restaurantId);
        const tables = await Table.find({ restaurantId });
        res.status(200).json(tables);
    } catch (error) {
        console.error('Error retrieving tables:', error);
        res.status(500).json({ error: 'Failed to retrieve tables' });
    }
};

const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const { number, capacity } = req.body;
        const restaurantId = req.user.restaurantId;

        const updatedTable = await Table.findOneAndUpdate(
            { _id: id, restaurantId },
            { number, capacity },
            { new: true }
        );

        if (!updatedTable) return res.status(404).json({ error: 'Table not found' });

        res.status(200).json({ message: 'Table updated successfully', table: updatedTable });
    } catch (error) {
        console.error('Error updating table:', error);
        res.status(400).json({ error: 'Failed to update table', details: error.message });
    }
};

const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantId = req.user.restaurantId;

        const deletedTable = await Table.findOneAndDelete({ _id: id, restaurantId });

        if (!deletedTable) return res.status(404).json({ error: 'Table not found' });

        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(500).json({ error: 'Failed to delete table' });
    }
};

module.exports = {
    createTable,
    getTables,
    updateTable,
    deleteTable,
};