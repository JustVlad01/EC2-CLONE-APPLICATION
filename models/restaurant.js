const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        county: { type: String, required: true },
        eircode: { type: String, required: true },
        country: { type: String, required: true },
    },
    restaurantCode: { type: String, unique: true, required: true },
    subscriptionStatus: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    subscriptionEndDate: { type: Date },
}, { timestamps: true });

// Pre-save hook to generate a unique restaurant code if it doesn't exist
restaurantSchema.pre('validate', function (next) {
    if (!this.restaurantCode) {
        this.restaurantCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
