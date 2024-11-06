const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/roles');
const Page = require('../models/pageAccess'); // PageAccess model

const authMiddleware = (pageName = null) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        console.log("Token:", token);
        if (!token) {
            return res.status(401).json({ msg: 'No token provided' });
        }

        try {
            // Decode the JWT token to get the user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;

            // Find the user and their role from the DB, including their restaurantId
            const user = await User.findById(req.user.id).populate('roleId');
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            req.user.restaurantId = user.restaurantId; // Add restaurantId to the request object

            // Get the user's role and ensure it belongs to the same restaurant
            const userRole = await Role.findOne({ _id: user.roleId, restaurantId: user.restaurantId });
            if (!userRole) {
                return res.status(404).json({ msg: 'User role not found or invalid for the restaurant' });
            }

            // If pageName is not set, skip role-based checks and proceed
            if (!pageName) {
                return next();
            }

            // Check if the PageAccess document exists for the given page and restaurant
            const page = await Page.findOne({ name: pageName, restaurantId: user.restaurantId }).populate('allowedRoles');
            if (!page) {
                return res.status(403).json({ msg: 'Forbidden: Page access not configured' });
            }

            // Check if the user's role is allowed to access the page
            const hasAccess = page.allowedRoles.some(role => role._id.equals(user.roleId));

            // Allow owner role full access
            const isOwner = userRole.name === 'owner';
            if (!isOwner && !hasAccess) {
                return res.status(403).json({ msg: 'Forbidden: Insufficient permissions' });
            }

            next(); // User has access, proceed to the next middleware or controller
        } catch (error) {
            console.error("Access denied:", error);
            return res.status(401).json({ msg: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;