const User = require("../models/user");
const axios = require('axios');
const cloudinary = require("../config/cloudinary_config");
const transporter = require("../config/nodemailer_config");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.searchUsers = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email search term is required",
      });
    }

    const users = await User.find({
      email: { $regex: email, $options: "i" }
    })
      .select("firstName lastName email")
      .limit(5);

    const formattedUsers = users.map(user => ({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email
    }));

    res.status(200).json({
      success: true,
      data: formattedUsers
    });
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({
      success: false,
      error: "Error searching users"
    });
  }
};


// JWT Token generation
const generateToken = require("../utils/generate_token");
// Register user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "The email address is not available. Choose another email.",
    });
  }
  const userName = firstName + " " + lastName;
  // Create the user
  let user;
  if (role == "seller") {
    user = await User.create({
      firstName,
      lastName,
      username: userName,
      email,
      password, // Password hashing is handled by mongoose's pre-save hook
      isSeller: true,
    });
  } else {
    user = await User.create({
      firstName,
      lastName,
      username: userName,
      email,
      password, // Password hashing is handled by mongoose's pre-save hook
      isSeller: false,
    });
  }
  // If the user is created successfully
  if (user) {
    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id), // Generate JWT token
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check if user is NOT a seller or admin
    if (user.isSeller || user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: user.isSeller 
          ? "Please use seller login for seller accounts." 
          : "Please use admin login for admin accounts."
      });
    }

    // Check if password matches
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // If all checks pass, generate token and send response
    const tokenExpiry = rememberMe ? "30d" : "1d";

    res.json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, tokenExpiry),
        imageUrl: user.imageUrl,
        bio: user.bio || "",
        phoneNum: user.phoneNum || "",
        isSeller: false,
        isAdmin: false
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message
    });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token with JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send email with password reset link
    const mailOptions = {
      from: "ahmadraza77887087@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                <p><a href="http://localhost:5173/reset-password/?token=${token}">Reset Password</a></p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `,
    };
    // console.log(transporter)
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Failed to send email" });
      }
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(token, newPassword);
    // Verify the JWT token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by the decoded token's _id
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's password, you can apply hashing if required
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "users",
      width: 300,
      crop: "scale",
    });

    res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, phoneNum, imageUrl, username, email } =
      req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrlData = null;
    if (imageUrl) {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "users",
        width: 1200,
        crop: "scale",
      });
      imageUrlData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;
    user.phoneNum = phoneNum || user.phoneNum;
    user.imageUrl = imageUrlData || user.imageUrl;
    user.username = username || user.username;
    user.email = email || user.email;
    console.log("User Details", user);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.activateSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscriptionId, subscriptionPlan, subscriptionStatus } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        subscriptionId,
        subscriptionPlan,
        subscriptionStatus,
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.emailValidation = async (req, res) => {
  const { email } = req.body;
  const apiKey = process.env.ZEROBOUNCE_API_KEY;

  try {
    const response = await axios.get(`https://api.zerobounce.net/v2/validate`, {
      params: { email, api_key: apiKey }
    });

    // The response status could be 'valid', 'invalid', or 'unknown'
    const isValid = response.data.status === "valid";

    if (isValid) {
      res.status(200).json({ message: 'Email is valid' });
    } else {
      res.status(400).json({ message: 'Email does not exist or is invalid' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying email' });
  }
}

exports.adminLogin = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Check if user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ 
        success: false,
        message: "Access denied. Admin privileges required." 
      });
    }

    // Check if password matches
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // If all checks pass, generate token and send response
    const tokenExpiry = rememberMe ? "30d" : "1d";
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, tokenExpiry),
        imageUrl: user.imageUrl,
        bio: user.bio || "",
        phoneNum: user.phoneNum || "",
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during admin login",
      error: error.message 
    });
  }
};

exports.loginSeller = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Check if user is a seller
    if (!user.isSeller) {
      return res.status(403).json({ 
        success: false,
        message: "Access denied. Seller privileges required." 
      });
    }

    // Check if password matches
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // If all checks pass, generate token and send response
    const tokenExpiry = rememberMe ? "30d" : "1d";
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, tokenExpiry),
        imageUrl: user.imageUrl,
        bio: user.bio || "",
        phoneNum: user.phoneNum || "",
        isSeller: user.isSeller
      }
    });

  } catch (error) {
    console.error("Seller login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during seller login",
      error: error.message 
    });
  }
};