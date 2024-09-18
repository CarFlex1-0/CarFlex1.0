const User = require('../models/user');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary_config');
const transporter = require('../config/nodemailer_config')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// JWT Token generation
const generateToken = require('../utils/generate_token')
// Register user
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password,  } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'The email address is not available. Choose another email.' });
    }
    const userName = firstName + " " + lastName
    // Create the user
    const user = await User.create({
        firstName,
        lastName,
        username : userName,
        email,
        password,  // Password hashing is handled by mongoose's pre-save hook
    });
    // If the user is created successfully
    if (user) {
        res.status(201).json({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),  // Generate JWT token
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
        const tokenExpiry = rememberMe ? '30d' : '1d';  // Adjust expiry based on "Remember Me"
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            token: generateToken(user._id, tokenExpiry),  // Generate JWT with expiry
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};



// Forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token with JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send email with password reset link
        const mailOptions = {
            from: 'ahmadraza77887087@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                <p><a href="http://localhost:5173/reset-password/?token=${token}">Reset Password</a></p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `
        };
        console.log(transporter)
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Failed to send email' });
            }
            res.status(200).json({ message: 'Password reset email sent' });
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        console.log(token, newPassword)
        // Verify the JWT token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by the decoded token's _id
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's password, you can apply hashing if required
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Upload profile image
exports.uploadProfileImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: 'users',
            width: 300,
            crop: 'scale',
        });

        res.status(200).json({
            public_id: result.public_id,
            url: result.secure_url,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, bio, phoneNum } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.bio = bio || user.bio;
        user.phoneNum = phoneNum || user.phoneNum;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
