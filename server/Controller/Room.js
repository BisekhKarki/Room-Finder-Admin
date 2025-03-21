const mongoose = require("mongoose");
const ApproveRoomSchema = require("../Schema/ApproveRooms");
const RoomSchema = require("../Schema/RoomSchema");
const { getAllLandlord } = require("./Landlord");

// Approving the room if payment is done and move the approved room
// to the rooms table
const approveRoom = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const findRoomById = await ApproveRoomSchema.findById(id);

    if (!findRoomById) {
      return res.status(404).json({
        success: false,
        message: "Room not found approval list",
      });
    }

    if (!findRoomById.payment) {
      return res.status(404).json({
        success: false,
        message: "Payment for room has not been made",
      });
    }

    const checkRooms = await RoomSchema.findById(id);

    if (checkRooms) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    findRoomById.isVerified = true;
    await findRoomById.save();

    const newRoom = new RoomSchema({
      ...findRoomById.toObject(),
    });
    await newRoom.save();

    return res.status(200).json({
      success: true,
      message: "Room approved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPendingRooms = async (req, res) => {
  try {
    const getAllRooms = await ApproveRoomSchema.find({ payment: false });
    if (!getAllRooms) {
      return res.status(400).json({
        success: false,
        message: "No room for approval",
      });
    }

    return res.status(200).json({
      success: true,
      message: getAllRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const getAllRooms = await RoomSchema.find({});
    if (!getAllRooms) {
      return res.status(400).json({
        success: false,
        message: "No rooms found",
      });
    }

    return res.status(200).json({
      success: true,
      message: getAllRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// For deletion of the rooms
const deleteApprovedRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const approvedRooms = await RoomSchema.findById(id);

    if (!approvedRooms) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const deleteRoomById = await RoomSchema.findByIdAndDelete(id);
    if (!deleteRoomById) {
      return res.status(404).json({
        success: false,
        message: "Failed to delete room",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  approveRoom,
  getAllPendingRooms,
  getAllRooms,
  deleteApprovedRoom,
};
