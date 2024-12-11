const CarConfig = require("../models/car_config_model");
const User = require("../models/user");

// Save new configuration
exports.saveConfiguration = async (req, res) => {
  try {
    const { name, performanceMetrics, customization } = req.body;
    const creator = req.user._id;

    if (!["civic", "corolla", "swift"].includes(customization.modelType)) {
      return res.status(400).json({
        success: false,
        error: "Invalid model type",
      });
    }

    const carConfig = new CarConfig({
      creator,
      name,
      performanceMetrics,
      customization,
    });

    await carConfig.save();

    await User.findByIdAndUpdate(creator, {
      $push: { createdCarConfigs: carConfig._id },
    });

    res.status(201).json({
      success: true,
      data: carConfig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all configurations for a user
exports.getConfigurations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get configurations created by the user
    const createdConfigs = await CarConfig.find({ creator: userId })
      .populate('creator', 'name email')
      .select('name customization performanceMetrics averageRating totalRatings ratings createdAt sharedWith');

    // Get configurations shared with the user
    const sharedConfigs = await CarConfig.find({ 
      sharedWith: userId 
    })
      .populate('creator', 'name email')
      .select('name customization performanceMetrics averageRating totalRatings ratings createdAt sharedWith');

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

// Get configuration by ID
exports.getConfigurationById = async (req, res) => {
  try {
    const userId = req.user._id;
    const config = await CarConfig.findById(req.params.id)
      .populate("creator", "name email")
      .populate("sharedWith", "name email");

    if (!config) {
      return res.status(404).json({
        success: false,
        error: "Configuration not found",
      });
    }

    const hasAccess =
      config.creator.equals(userId) ||
      config.sharedWith.some((user) => user._id.equals(userId));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to view this configuration",
      });
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete configuration
exports.deleteConfiguration = async (req, res) => {
  try {
    const config = await CarConfig.findById(req.params.id);

    if (!config) {
      return res.status(404).json({
        success: false,
        error: "Configuration not found",
      });
    }

    // Check if user is the creator of this configuration
    if (config.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this configuration",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { createdCarConfigs: config._id },
    });

    if (config.sharedWith && config.sharedWith.length > 0) {
      await User.updateMany(
        { _id: { $in: config.sharedWith } },
        { $pull: { sharedCarConfigs: config._id } }
      );
    }

    await config.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update configuration
exports.updateConfiguration = async (req, res) => {
  try {
    const configId = req.params.id;
    const updates = req.body;
    const userId = req.user._id;

    if (
      updates.customization?.modelType &&
      !["civic", "corolla", "swift"].includes(updates.customization.modelType)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid model type",
      });
    }

    const config = await CarConfig.findById(configId);

    if (!config) {
      return res.status(404).json({
        success: false,
        error: "Configuration not found",
      });
    }

    const hasPermission =
      config.creator.equals(userId) ||
      config.sharedWith.some((id) => id.equals(userId));

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to edit this configuration",
      });
    }

    if (!config.creator.equals(userId)) {
      const allowedUpdates = ["customization", "performanceMetrics"];
      Object.keys(updates).forEach((key) => {
        if (!allowedUpdates.includes(key)) {
          delete updates[key];
        }
      });
    }

    const updatedConfig = await CarConfig.findByIdAndUpdate(configId, updates, {
      new: true,
      runValidators: true,
    })
      .populate("creator", "name email")
      .populate("sharedWith", "name email");

    res.status(200).json({
      success: true,
      data: updatedConfig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Share configuration
exports.shareConfiguration = async (req, res) => {
  try {
    const { configId, userEmail } = req.body;
    const sharingUser = req.user._id;

    const config = await CarConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        error: "Configuration not found",
      });
    }

    if (!config.creator.equals(sharingUser)) {
      return res.status(403).json({
        success: false,
        error: "Only the creator can share this configuration",
      });
    }

    const userToShare = await User.findOne({ email: userEmail });
    if (!userToShare) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (config.sharedWith.includes(userToShare._id)) {
      return res.status(400).json({
        success: false,
        error: "Configuration already shared with this user",
      });
    }

    config.sharedWith.push(userToShare._id);
    await config.save();

    await User.findByIdAndUpdate(userToShare._id, {
      $push: { sharedCarConfigs: configId },
    });

    res.status(200).json({
      success: true,
      message: "Configuration shared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
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
        error: "Configuration not found",
      });
    }

    if (!config.creator.equals(removingUser)) {
      return res.status(403).json({
        success: false,
        error: "Only the creator can remove sharing access",
      });
    }

    config.sharedWith = config.sharedWith.filter((id) => !id.equals(userId));
    await config.save();

    await User.findByIdAndUpdate(userId, {
      $pull: { sharedCarConfigs: configId },
    });

    res.status(200).json({
      success: true,
      message: "Sharing access removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all public configurations
exports.getAllPublicConfigurations = async (req, res) => {
  try {
    const { modelType, sort = 'rating' } = req.body;
    const query = {};

    if (modelType) {
      query['customization.modelType'] = modelType;
    }

    let sortOptions = {};
    if (sort === 'rating') {
      sortOptions = { averageRating: -1 };
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const configurations = await CarConfig.find(query)
      .sort(sortOptions)
      .populate('creator', 'name email')
      .select('name customization performanceMetrics averageRating totalRatings ratings createdAt sharedWith');

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

// Rate a configuration
exports.rateConfiguration = async (req, res) => {
  try {
    const { configId, rating } = req.body;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5",
      });
    }

    const config = await CarConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        error: "Configuration not found",
      });
    }

    const existingRatingIndex = config.ratings.findIndex(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingRatingIndex !== -1) {
      config.ratings[existingRatingIndex].rating = rating;
    } else {
      config.ratings.push({
        user: userId,
        rating,
      });
    }

    config.calculateAverageRating();
    await config.save();

    res.status(200).json({
      success: true,
      data: {
        averageRating: config.averageRating,
        totalRatings: config.totalRatings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get user's rating for a configuration
exports.getUserRating = async (req, res) => {
  try {
    const configId = req.params.configId;
    const userId = req.user._id;

    const config = await CarConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        error: "Configuration not found",
      });
    }

    const userRating = config.ratings.find(
      (r) => r.user.toString() === userId.toString()
    );

    res.status(200).json({
      success: true,
      data: {
        rating: userRating ? userRating.rating : null,
        averageRating: config.averageRating,
        totalRatings: config.totalRatings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
