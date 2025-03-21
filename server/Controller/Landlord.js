const mongoose = require("mongoose");
const Users = require("../Schema/UserModel");

const deleteLandLord = async (req, res) => {
  const { id } = req.params;

  try {
    const findLandLord = await Users.findById(id);
    if (!findLandLord) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    const deleteLandLord = await Users.findByIdAndDelete(id);
    if (!deleteLandLord) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete the user",
      });
    }

    return res.status(200).json({
      success: false,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getAllLandlord = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const getUsers = await Users.find({}).select("-Password");
    const landlordUser = getUsers.filter(
      (user) => user.UserType === "Landlord"
    );

    if (!getUsers) {
      return res.status(400).json({
        success: false,
        message: "Something wrong!!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: landlordUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { deleteLandLord, getAllLandlord };
