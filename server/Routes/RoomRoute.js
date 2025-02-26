const router = require("express").Router();
const {
  approveRoom,
  getAllPendingRooms,
  getAllRooms,
  // , deleteRoom
} = require("../Controller/Room");
const protectRoute = require("../Middleware/ProtectRoute");

router.get("/room", protectRoute, getAllRooms);
router.patch("/room/verify/:id", protectRoute, approveRoom);
router.get("/room/all/approve", protectRoute, getAllPendingRooms);

// router.delete("/room/delete/:id", deleteRoom);

module.exports = router;
