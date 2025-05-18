const approveRoom = require("../Schema/ApproveRooms");
const roomSchema = require("../Schema/RoomSchema");
const userSchema = require("../Schema/UserModel");

const getTotals = async (req, res) => {
  try {
    const users = await userSchema.find({});
    const pendingRooms = await approveRoom.find({ payment: false });
    const approvedRooms = await roomSchema.find({});

    const totalUsers = users.length;
    const totaApprovalLeft = pendingRooms.length;
    const totalRooms = approvedRooms.length;

    return res.status(200).json({
      success: false,
      message: {
        users,
        pendingRooms,
        approvedRooms,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getTotals };
