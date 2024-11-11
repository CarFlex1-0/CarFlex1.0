const User = require("../models/user");

exports.searchUsers = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email search term is required'
      });
    }

    // Find users whose email matches the search term (case-insensitive)
    // Exclude the current user from results
    const users = await User.find({
      email: { $regex: email, $options: 'i' },
      _id: { $ne: req.user._id } // Exclude current user
    })
      .select('firstName lastName email') // Update selected fields
      .limit(5);

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      error: 'Error searching users'
    });
  }
}; 