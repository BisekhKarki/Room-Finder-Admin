const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  changePassword,
  fetchUserPayment,
  fetchLanlordPayment,
} = require("../Controller/Admin");
const protectRoute = require("../Middleware/ProtectRoute");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/getuser", protectRoute, getUserDetails);
router.get("/getUserPayment", protectRoute, fetchUserPayment);
router.get("/getLandlordPayment", protectRoute, fetchLanlordPayment);
router.patch("/changepassword", protectRoute, changePassword);

module.exports = router;
