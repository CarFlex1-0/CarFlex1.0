const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    phoneNum: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      url: String,
      public_id: String,
    },
    blogsList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSeller: { type: Boolean, default: false }, // Added field for seller distinction
    subscription:{
      subscriptionPlan: { type: String, default: null }, // To store the name of the plan
      subscriptionStatus: { type: String, default: 'inactive' }, // e.g., 'active' or 'inactive'
      activationDate:{
        type: Date,
      }, 
      expirationDate:{
        type: Date,
      },
    },
    chatHistory:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    }]
  },

  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  // If password is not modified, move to the next middleware
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password if it's modified or a new user
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Move to the next middleware once hashing is done
});

const User = mongoose.model("User", userSchema);

module.exports = User;
