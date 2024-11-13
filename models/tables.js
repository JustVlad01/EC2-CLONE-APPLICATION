const mongoose = require('mongoose');

const TablesSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    capacity: {
        type: Number,
    },
    number: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

TablesSchema.index({ restaurantId: 1, number: 1 }, { unique: true });

TablesSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.Tables || mongoose.model('Tables', TablesSchema);
