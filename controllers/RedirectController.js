const redirectToClient = (req, res) => {
    const clientUrl = `${process.env.CLIENT_FRONTEND_URL}/${req.user.restaurantId}`;

    return res.status(200).json({ clientUrl });
};

module.exports = {
    redirectToClient
};
