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
  }
});

module.exports = mongoose.model('CarConfig', carConfigSchema); 