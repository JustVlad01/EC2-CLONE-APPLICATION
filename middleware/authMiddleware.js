const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/roles');

const authMiddleware = (requiredRoleName) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ msg: 'No token provided' });
        }

        try {
            // Decode the JWT token to get the user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;

            // Find the user and their role from the DB
            const user = await User.findById(req.user.id).populate('roleId');
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            // Get the user's role and priority
            const userRole = await Role.findById(user.roleId);
            if (!userRole) {
                return res.status(404).json({ msg: 'User role not found' });
            }

            // Find the required role from the DB based on its name
            const requiredRole = await Role.findOne({ name: requiredRoleName, restaurantId: user.restaurantId });
            if (!requiredRole) {
                return res.status(404).json({ msg: 'Required role not found' });
            }

            // Compare priorities (lower priority number = more authority)
            if (userRole.priority > requiredRole.priority) {
                return res.status(403).json({ msg: 'Forbidden: Insufficient permissions' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ msg: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
