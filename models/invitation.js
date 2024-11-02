const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const InvitationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    uniqueCode: {
        type: String,
        default: uuidv4,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,  // The invitation must be associated with a restaurant
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24*60*60*1000 // 24 hours expiry
    },
    used: {
        type: Boolean,
        default: false,
    },
})

InvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);
