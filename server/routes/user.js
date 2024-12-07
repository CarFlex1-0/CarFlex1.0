const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user_controller');
const router = express.Router();

// Search users route
router.get('/search', userController.searchUsers);

// @route   POST /api/users/register
// @desc    Register a new user
router.post(
  '/register',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  userController.registerUser
);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  userController.loginUser
);

// @route   POST /api/users/login-seller
// @desc    Authenticate Seller & get token
router.post(
  '/login-seller',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  userController.loginSeller
);

// @route   POST /api/users/forgot-password
// @desc    Send password reset email
router.post(
  '/forgot-password',
  [check('email', 'Please include a valid email').isEmail()],
  userController.forgotPassword
);

// @route   POST /api/users/reset-password/:token
// @desc    Reset user password
router.post(
  '/reset-password',
  [
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('confirmPassword', 'Passwords must match').custom((value, { req }) => value === req.body.password),
  ],
  userController.resetPassword
);

// @route   POST /api/users/upload-image
// @desc    Upload profile image to Cloudinary
router.post('/upload-image', userController.uploadProfileImage);

// @route   GET /api/users/profile/:id
// @desc    Get user profile by ID
router.get('/profile/:id', userController.getUserProfile);

// @route   PUT /api/users/profile/:id
// @desc    Update user profile
router.put('/profile/:id', userController.updateUserProfile);

// Route to update user's subscription
router.patch('/:id/subscribe', userController.activateSubscription);
router.post('/validate-email', userController.emailValidation);

// Add this new route to your existing routes
router.post(
  '/admin-login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  userController.adminLogin
);

module.exports = router;
