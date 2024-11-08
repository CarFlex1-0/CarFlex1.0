const CarConfig = require('../models/carConfig.model');
const User = require('../models/user');

exports.saveConfiguration = async (req, res) => {
  try {
    const { name, performanceMetrics, customization } = req.body;
    const creator = req.user._id;

    const carConfig = new CarConfig({
      creator,
      name,
      performanceMetrics,
      customization
    });

    await carConfig.save();

    // Add the configuration to user's createdCarConfigs
    await User.findByIdAndUpdate(creator, {
      $push: { createdCarConfigs: carConfig._id }
    });

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
    const user = await User.findById(userId)
      .populate('createdCarConfigs')
      .populate('sharedCarConfigs');

    const configurations = {
      created: user.createdCarConfigs || [],
      shared: user.sharedCarConfigs || []
    };

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

    // Check if user is the creator of this configuration
    if (config.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this configuration'
      });
    }

    // Remove the configuration from user's createdCarConfigs
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { createdCarConfigs: config._id }
    });

    // Remove from sharedWith users' sharedCarConfigs
    if (config.sharedWith && config.sharedWith.length > 0) {
      await User.updateMany(
        { _id: { $in: config.sharedWith } },
        { $pull: { sharedCarConfigs: config._id } }
      );
    }

    await config.deleteOne();

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