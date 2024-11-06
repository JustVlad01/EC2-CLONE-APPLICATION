const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TablesSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,  // The invitation must be associated with a restaurant
    },
    capacity: {
        type: Number,
    },
    number: {
        type: Number,
    },
})

TablesSchema.index({ restaurantId: 1, number: 1 }, { unique: true });

TablesSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.Tables || mongoose.model('Tables', TablesSchema);
