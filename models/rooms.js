const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    rooms: [
        {
            from: {
                type: Number,
                required: true,
            },
            to: {
                type: Number,
                required: true,
            },
        },
    ],
}, { timestamps: true });

RoomsSchema.index({ restaurantId: 1, floor: 1 }, { unique: true });

module.exports = mongoose.models.Rooms || mongoose.model('Rooms', RoomsSchema);
