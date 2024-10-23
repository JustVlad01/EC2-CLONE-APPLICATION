const Invitation = require('../models/Invitation');

exports.createInvitation = async (req, res) => {
    try {
        const { email } = req.body;

        // Make sure restaurantId exists in req.user
        const restaurantId = req.user.restaurantId;
        if (!restaurantId) {
            return res.status(400).json({ msg: 'Restaurant ID is required.' });
        }

        // Create a new invitation with a unique code and associated restaurant
        const invitation = new Invitation({ email, restaurantId });

        await invitation.save();

        // Generate the invitation url
        const invitationUrl = `${req.protocol}://${process.env.ADMIN_FRONTEND_URL}/?code=${invitation.uniqueCode}`;

        res.status(201).json({
            message: 'Invitation created successfully',
            invitationUrl,
        });
    } catch (error) {
        console.error('Error creating invitation:', error);
        res.status(500).json({ error: 'Failed to create invitation' });
    }
};
