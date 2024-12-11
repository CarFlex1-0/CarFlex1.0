const mongoose = require('mongoose');

const carConfigSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  performanceMetrics: {
    bodyData: {
      p: Number,    // Power in horsepower
      kW: Number,   // Kerb weight in kg
      dC: Number,   // Drag coefficient
      w: Number,    // Width in mm
      h: Number,    // Height in mm
      t: Number,    // Torque in Nm
      r: Number,    // RPM for torque
      nOC: Number,  // Number of cylinders
      bD: Number,   // Bore diameter in mm
      pS: Number,   // Piston stroke in mm
      brpm: Number  // RPM at max power
    },
    metrics: {
      acceleration: Number,
      maxSpeed: Number,
      horsepower: Number,
      cc: Number,
      torque: Number
    }
  },
  customization: {
    modelType: {
      type: String,
      enum: ['civic', 'corolla', 'swift'], // Restrict to only these values
      required: true
    },
    interior: Number,
    interiorColor: {
      name: String,
      color: String
    },
    door: Number,
    doorColor: {
      name: String,
      color: String
    },
    spoiler: Number,
    spoilerColor: {
      name: String,
      color: String
    },
    rim: Number,
    rimColor: {
      name: String,
      color: String
    },
    wheels: Number,
    bonnet: Number,
    bonnetColor: {
      name: String,
      color: String
    },
    sideKit: Number,
    sideKitColor: {
      name: String,
      color: String
    },
    windowColor: {
      name: String,
      color: String
    },
    carBodyColor: {
      name: String,
      color: String
    },
    bumperFrontColor: {
      name: String,
      color: String
    },
    bumperBackColor: {
      name: String,
      color: String
    },
    grillColor: {
      name: String,
      color: String
    },
    fenderColor: {
      name: String,
      color: String
    },
    diffuser: Number,
    diffuserColor: {
      name: String,
      color: String
    },
    roofColor: {
      name: String,
      color: String
    },
    trunkColor: {
      name: String,
      color: String
    },
    silencer: Number
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  }
});

// Add method to calculate average rating
carConfigSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    this.totalRatings = 0;
  } else {
    const sum = this.ratings.reduce((acc, item) => acc + item.rating, 0);
    this.averageRating = sum / this.ratings.length;
    this.totalRatings = this.ratings.length;
  }
};

// Add methods to check permissions
carConfigSchema.methods.canEdit = function(userId) {
  return this.creator.equals(userId) || 
         this.sharedWith.some(id => id.equals(userId));
};

carConfigSchema.methods.isCreator = function(userId) {
  return this.creator.equals(userId);
};

module.exports = mongoose.model('CarConfig', carConfigSchema); 