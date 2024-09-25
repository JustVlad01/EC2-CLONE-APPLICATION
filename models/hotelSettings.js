const mongoose = require('mongoose');

const hotelSettingsSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    generalSettings: { type: Object, required: false },
    paymentOptions: { type: Object, required: false },
    discountRules: { type: Object, required: false },
    voucherSettings: { type: Object, required: false },
    menuCategories: { type: Array, required: false },
    customizationOptions: { type: Object, required: false }
});

module.exports = mongoose.model('HotelSettings', hotelSettingsSchema);
