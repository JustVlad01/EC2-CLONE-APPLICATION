const mongoose = require('mongoose');

// Define schema for PageAccess
const pageAccessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    allowedRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    type: { type: String, enum: ['page', 'action'], default: 'action' },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
}, { timestamps: true });

// Export the model
module.exports = mongoose.models.PageAccess || mongoose.model('PageAccess', pageAccessSchema);
