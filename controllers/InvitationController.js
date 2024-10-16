const Invitation = require('../models/invitation');

exports.createInvitation = async (req, res) => {
    try {
        const { email } = req.body;

        // Create a new invitation with a unique code
        const invitation = new Invitation({ email });

        await invitation.save();

        // Generate the invitation url
        const invitationUrl = `${req.protocol}://${process.env.ADMIN_FRONTEND}/?code=${invitation.uniqueCode}`;

        res.status(201).json({
            message: 'Invitation created successfully',
            invitationUrl,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create invitation' });
    }
};
