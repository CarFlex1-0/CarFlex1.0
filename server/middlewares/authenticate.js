// middleware to authenticate token
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }

            try {
                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(404).json({ message: 'ddUser not found' });
                }

                req.user = user;
                next();
            } catch (error) {
                console.error('Error fetching user:', error);
                res.status(500).json({ message: 'Failed to authenticate user' });
            }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
const seller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as a seller');
    }
};

module.exports = {authenticateToken, protect,seller};