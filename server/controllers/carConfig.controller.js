const CarConfig = require('../models/carConfig.model');

exports.saveConfiguration = async (req, res) => {
  try {
    const { name, performanceMetrics, customization } = req.body;
    const userId = req.user._id; // Assuming you have user info in request

    const carConfig = new CarConfig({
      userId,
      name,
      performanceMetrics,
      customization
    });

    await carConfig.save();

    res.status(201).json({
      success: true,
      data: carConfig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getConfigurations = async (req, res) => {
  try {
    const userId = req.user._id;
    const configurations = await CarConfig.find({ userId });

    res.status(200).json({
      success: true,
      data: configurations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getConfigurationById = async (req, res) => {
  try {
    const config = await CarConfig.findById(req.params.id);
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'Configuration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteConfiguration = async (req, res) => {
  try {
    const config = await CarConfig.findById(req.params.id);
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'Configuration not found'
      });
    }

    // Check if user owns this configuration
    if (config.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this configuration'
      });
    }

    await config.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 