const CarConfig = require('../models/car_config_model');
const User = require('../models/user');

exports.saveConfiguration = async (req, res) => {
  try {
    const { name, performanceMetrics, customization } = req.body;
    // const creator = req.user._id;
    const creator = req.user._id;
    // Validate model type
    if (!['civic', 'corolla', 'swift'].includes(customization.modelType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid model type'
      });
    }

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

    // Get configurations created by the user
    const createdConfigs = await CarConfig.find({ creator: userId })
      .populate('creator', 'name email');

    // Get configurations shared with the user
    const sharedConfigs = await CarConfig.find({ 
      sharedWith: userId 
    }).populate('creator', 'name email');

    res.status(200).json({
      success: true,
      data: {
        created: createdConfigs,
        shared: sharedConfigs
      }
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
    const userId = req.user._id;
    const config = await CarConfig.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('sharedWith', 'name email');
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'Configuration not found'
      });
    }

    // Check if user has access to this configuration
    const hasAccess = config.creator.equals(userId) || 
                     config.sharedWith.some(user => user._id.equals(userId));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this configuration'
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

exports.updateConfiguration = async (req, res) => {
  try {
    const configId = req.params.id;
    const updates = req.body;
    const userId = req.user._id;

    // Validate model type if it's being updated
    if (updates.customization?.modelType && 
        !['civic', 'corolla', 'swift'].includes(updates.customization.modelType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid model type'
      });
    }

    const config = await CarConfig.findById(configId);
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'Configuration not found'
      });
    }

    // Check if user has permission to edit (creator or shared user)
    const hasPermission = config.creator.equals(userId) || 
                         config.sharedWith.some(id => id.equals(userId));

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to edit this configuration'
      });
    }

    // If it's a shared user, they can only update customization and performance metrics
    if (!config.creator.equals(userId)) {
      const allowedUpdates = ['customization', 'performanceMetrics'];
      Object.keys(updates).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          delete updates[key];
        }
      });
    }

    // Update the configuration
    const updatedConfig = await CarConfig.findByIdAndUpdate(
      configId,
      { ...updates },
      { new: true, runValidators: true }
    ).populate('creator', 'name email')
     .populate('sharedWith', 'name email');

    res.status(200).json({
      success: true,
      data: updatedConfig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add sharing functionality
exports.shareConfiguration = async (req, res) => {
  try {
    const { configId, userEmail } = req.body;
    const sharingUser = req.user._id;

    // Find the configuration
    const config = await CarConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'Configuration not found'
      });
    }

    // Verify the sharing user is the creator
    if (!config.creator.equals(sharingUser)) {
      return res.status(403).json({
        success: false,
        error: 'Only the creator can share this configuration'
      });
    }

    // Find the user to share with
    const userToShare = await User.findOne({ email: userEmail });
    if (!userToShare) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if already shared
    if (config.sharedWith.includes(userToShare._id)) {
      return res.status(400).json({
        success: false,
        error: 'Configuration already shared with this user'
      });
    }

    // Add user to sharedWith array
    config.sharedWith.push(userToShare._id);
    await config.save();

    // Add configuration to user's sharedCarConfigs
    await User.findByIdAndUpdate(userToShare._id, {
      $push: { sharedCarConfigs: configId }
    });

    res.status(200).json({
      success: true,
      message: 'Configuration shared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Remove sharing access
exports.removeShare = async (req, res) => {
  try {
    const { configId, userId } = req.body;
    const removingUser = req.user._id;

    const config = await CarConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'Configuration not found'
      });
    }

    // Verify the removing user is the creator
    if (!config.creator.equals(removingUser)) {
      return res.status(403).json({
        success: false,
        error: 'Only the creator can remove sharing access'
      });
    }

    // Remove user from sharedWith array
    config.sharedWith = config.sharedWith.filter(id => !id.equals(userId));
    await config.save();

    // Remove configuration from user's sharedCarConfigs
    await User.findByIdAndUpdate(userId, {
      $pull: { sharedCarConfigs: configId }
    });

    res.status(200).json({
      success: true,
      message: 'Sharing access removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 