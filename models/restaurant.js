const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    //Restaurant fields
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    //Owner ID
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    //Address schema
    address: {
        city: { type: String, required: true },
        county: { type: String, required: true },
        eircode: { type: String, required: true },
        country: { type: String, required: true },
    },
    //Opening hours schema
    openingHours: {
        week: {
            open: { type: String},
            close: { type: String},
        },
        saturday: {
            open: { type: String},
            close: { type: String},
        },
        sunday: {
            open: { type: String},
            close: { type: String},
        },
    },
    //Other fields
    website: { type: String },
    cusineType: { type: String },
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

module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);
