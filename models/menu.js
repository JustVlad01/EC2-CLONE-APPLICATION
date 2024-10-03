const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const menuSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false },
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
