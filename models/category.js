const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    name: { type: String, required: true },
    description: { type: String },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);