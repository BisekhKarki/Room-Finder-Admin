const mongoose = require("mongoose");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userSchema = new mongoose.Schema({});
    const User = mongoose.model("User", userSchema);
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = deleteUser;
