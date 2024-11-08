const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  saveConfiguration,
  getConfigurations,
  getConfigurationById,
  deleteConfiguration
} = require('../controllers/carConfig.controller');

// Use authenticate instead of protect
router.use(authenticate);

router.route('/')
  .post(saveConfiguration)
  .get(getConfigurations);

router.route('/:id')
  .get(getConfigurationById)
  .delete(deleteConfiguration);

module.exports = router; 