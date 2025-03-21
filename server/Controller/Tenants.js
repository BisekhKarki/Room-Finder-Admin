const mongoose = require("mongoose");
const Users = require("../Schema/UserModel");

const deleteTenants = async (req, res) => {
  const { id } = req.params;

  try {
    const findTenants = await Users.findById(id);
    if (!findTenants) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    const deletTenants = await Users.findByIdAndDelete(id);
    if (!deletTenants) {
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

const getAllTenants = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const getUsers = await Users.find({}).select("-Password");
    const tenantUsers = getUsers.filter((user) => user.UserType === "Tenants");

    if (!getUsers) {
      return res.status(400).json({
        success: false,
        message: "Something wrong!!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: tenantUsers,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  deleteTenants,
  getAllTenants,
};
