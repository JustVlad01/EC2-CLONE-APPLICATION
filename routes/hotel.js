const express = require('express');
const router = express.Router();
const Hotel = require("../models/restaurant");
const HotelSettings = require("../models/hotelSettings");
const User = require("../models/user");
const mongoose = require("mongoose");

// Create hotel data and owner profile
router.post("/", async (req, res) => {
    try {
        //Create owner profile
        const ownerProfile = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'owner'
        });

        const savedOwnerProfile = await ownerProfile.save();

        // Create a new hotel instance with the request body data
        const newHotel = new Hotel({
            name: req.body.name,
            ownerId: savedOwnerProfile._id,
            address: {
                street: req.body.street,
                city: req.body.city,
                county: req.body.county,
                eircode: req.body.eircode,
                country: req.body.country,
            },
        });

        // Save the hotel first so we get the hotel ID
        const savedHotel = await newHotel.save();

        //Add the hotel ID to the owner profile
        savedOwnerProfile.restaurantId = savedHotel._id;
        await savedOwnerProfile.save();

        // Now create hotel settings using the saved hotel's ID
        const newHotelSettings = new HotelSettings({
            hotelId: savedHotel._id,
            generalSettings: req.body.generalSettings,
            paymentOptions: req.body.paymentOptions,
            discountRules: req.body.discountRules,
            voucherSettings: req.body.voucherSettings,
            menuCategories: req.body.menuCategories,
            customizationOptions: req.body.customizationOptions
        });

        // Save the hotel settings
        const savedHotelSettings = await newHotelSettings.save();

        // Update the hotel document with the reference to the saved settings
        savedHotel.settings = savedHotelSettings._id;
        await savedHotel.save();

        // Send success message
        res.status(201).json({ message: "Hotel created and registered. Owner account created"});
    } catch (error) {
        // Send error response if any error occurs
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
