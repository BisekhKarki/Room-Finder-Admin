const mongoose = require("mongoose");
// Room schema
const room = new mongoose.Schema({}, { strict: false });
// Approval schema
const approvals = new mongoose.Schema({}, { strict: false });

// Approving the room if payment is done and move the approved room
// to the rooms table
const approveRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const findRoom = mongoose.model("rooms", room);
    const approval = mongoose.model("approvals", approvals);

    const findRoomById = await approval.findOne({ _id: id });
    if (!findRoomById) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const updatedApproval = await approval.findByIdAndUpdate(
      id,
      {
        payment: true,
      },
      {
        new: true,
      }
    );

    if (!updatedApproval) {
      return res.status(404).json({
        success: false,
        message: "Failed to approve room",
      });
    }

    const checkRooms = await findRoom.findById(id);
    if (checkRooms) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    const newRoom = new findRoom({
      _id: id,
      Room: updatedApproval.Room,
      payment: updatedApproval.payment,
    });
    await newRoom.save();

    const deleteRoom = await approval.findByIdAndDelete(id);
    if (!deleteRoom) {
      return res.status(200).json({
        success: true,
        message: "Room approval unsuccessfull",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room approved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// For deletion of the rooms
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = new mongoose.Schema({});
    const findRoom = mongoose.model("rooms", room);

    const findRooms = await findRoom.findById(id);
    if (!findRooms) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const deleteRoomById = await findRoom.findByIdAndDelete(id);
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
  deleteRoom,
};
