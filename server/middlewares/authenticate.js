// middleware to authenticate token
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

module.exports = authenticateToken;