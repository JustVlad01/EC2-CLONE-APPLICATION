const PageAccess = require('../models/PageAccess');
const Role = require('../models/roles');
const Restaurant = require('../models/restaurant');
const { pages, actions } = require("../routes/pageAccessList"); // Import pages and actions from roleData

// Create new page access rule (owner only)
const createPageAccess = async (req, res) => {
    const { page, allowedRoles, restaurantId } = req.body;

    try {
        const pageAccess = new PageAccess({
            name: page,
            allowedRoles,
            restaurantId
        });

        await pageAccess.save();
        res.status(201).json({ msg: 'Page access created successfully', pageAccess });
    } catch (error) {
        console.error('Error creating page access:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
};

// Get page access by restaurant (owner only)
const getPageAccessByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const pageAccessEntries = await PageAccess.find({ restaurantId })
            .populate('allowedRoles')
            .select('name type allowedRoles'); // Include type in the response

        if (!pageAccessEntries || pageAccessEntries.length === 0) {
            return res.status(404).json({ msg: 'No page access entries found for this restaurant' });
        }

        res.status(200).json(pageAccessEntries);
    } catch (error) {
        console.error('Error retrieving page access:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
};


// Update page access (owner only)
const updatePageAccess = async (req, res) => {
    const { id } = req.params;
    const { allowedRoles } = req.body;

    try {
        const updatedPageAccess = await PageAccess.findByIdAndUpdate(
            id,
            { allowedRoles },
            { new: true }
        ).populate('allowedRoles');

        if (!updatedPageAccess) {
            return res.status(404).json({ msg: 'Page access entry not found' });
        }

        res.status(200).json({ msg: 'Page access updated successfully', updatedPageAccess });
    } catch (error) {
        console.error('Error updating page access:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
};

// Delete page access (owner only)
const deletePageAccess = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPageAccess = await PageAccess.findByIdAndDelete(id);

        if (!deletedPageAccess) {
            return res.status(404).json({ msg: 'Page access entry not found' });
        }

        res.status(200).json({ msg: 'Page access deleted successfully' });
    } catch (error) {
        console.error('Error deleting page access:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
};

// Sync page accesses when a restaurant is created or updated (for developer use only)
const syncPageAccesses = async (req, res) => {
    const { restaurantId, pass } = req.params;

    if (pass !== process.env.SYNC_ACCESS_PASSWORD) {
        return res.status(403).json({ msg: 'Forbidden: Invalid password' });
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        // Sync actions
        for (const actionGroup of Object.values(actions)) {
            for (const action of actionGroup) {
                const exists = await PageAccess.findOne({ name: action, restaurantId, type: 'action' });
                if (!exists) {
                    await PageAccess.create({ name: action, restaurantId, allowedRoles: [], type: 'action' });
                    console.log(`Created PageAccess for action: ${action} in restaurant ${restaurantId}`);
                }
            }
        }

        // Sync pages
        for (const page of pages) {
            const exists = await PageAccess.findOne({ name: page, restaurantId, type: 'page' });
            if (!exists) {
                await PageAccess.create({ name: page, restaurantId, allowedRoles: [], type: 'page' });
                console.log(`Created PageAccess for page: ${page} in restaurant ${restaurantId}`);
            }
        }

        res.status(200).json({ msg: 'Page accesses synced successfully' });
    } catch (error) {
        console.error('Error syncing page accesses:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
};


module.exports = {
    createPageAccess,
    getPageAccessByRestaurant,
    updatePageAccess,
    deletePageAccess,
    syncPageAccesses
};
