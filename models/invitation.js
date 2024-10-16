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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24*60*60*1000
    },
    used: {
        type: Boolean,
        default: false,
    },
})

InvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Invitation', InvitationSchema);