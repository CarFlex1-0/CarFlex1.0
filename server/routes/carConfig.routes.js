const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  saveConfiguration,
  getConfigurations,
  getConfigurationById,
  deleteConfiguration,
  updateConfiguration,
  shareConfiguration,
  removeShare
} = require('../controllers/carConfig.controller');

router.use(authenticate);

router.route('/')
  .post(saveConfiguration)
  .get(getConfigurations);

router.post('/share', shareConfiguration);
router.delete('/share', removeShare);

router.route('/:id')
  .get(getConfigurationById)
  .put(updateConfiguration)
  .delete(deleteConfiguration);

module.exports = router; 