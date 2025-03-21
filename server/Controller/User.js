const mongoose = require("mongoose");
const Users = require("../Schema/UserModel");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await Users.findById(id);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    const deleteUser = await Users.findByIdAndDelete(id);

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

const getAllUser = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const getUsers = await Users.find({}).select("-Password");
    if (!getUsers) {
      return res.status(400).json({
        success: false,
        message: "Something wrong!!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: getUsers,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { deleteUser, getAllUser };
