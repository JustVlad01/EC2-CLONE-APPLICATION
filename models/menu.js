const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortTitle: { type: String },
    description: { type: String },
    timeRange: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
