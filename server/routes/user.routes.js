const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/user.controller');

// Protected routes (require authentication)
router.use(authenticate);

// Search users route
router.get('/search', userController.searchUsers);

module.exports = router; 