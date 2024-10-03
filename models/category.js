const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: false },
    title: { type: String, required: true },
    time: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
