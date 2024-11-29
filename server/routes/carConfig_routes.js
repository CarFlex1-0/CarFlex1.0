const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authenticate');
const {
  saveConfiguration,
  getConfigurations,
  getConfigurationById,
  deleteConfiguration,
  updateConfiguration,
  shareConfiguration,
  removeShare
} = require('../controllers/car_config_controller');

router.use(authenticateToken);

router.route('/')
  .post( saveConfiguration)
  .get( getConfigurations);

router.post('/share', shareConfiguration);
router.delete('/share', removeShare);

router.route('/:id')
  .get(getConfigurationById)
  .put(updateConfiguration)
  .delete(deleteConfiguration);

module.exports = router; 