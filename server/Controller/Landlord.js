const mongoose = require("mongoose");

const deleteLandLord = async (req, res) => {
  const { id } = req.params;

  try {
    const landLordSchema = new mongoose.Schema({});
    const landlord = mongoose.model("landlords", landLordSchema);
    const findLandLord = await landlord.findById(id);
    if (!findLandLord) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    const deleteLandLord = await landlord.findByIdAndDelete(id);
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

module.exports = deleteLandLord;
