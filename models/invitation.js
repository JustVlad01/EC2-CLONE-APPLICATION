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
    },
    used: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Invitation', InvitationSchema);