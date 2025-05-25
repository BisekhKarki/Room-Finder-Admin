const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  changePassword,
  fetchUserPayment,
  fetchLanlordPayment,
  sendCodeToEmail,
  verifyCode,
  changeUserPassword,
} = require("../Controller/Admin");
const protectRoute = require("../Middleware/ProtectRoute");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/getuser", protectRoute, getUserDetails);
router.get("/getUserPayment", protectRoute, fetchUserPayment);
router.get("/getLandlordPayment", protectRoute, fetchLanlordPayment);
router.patch("/changepassword", protectRoute, changePassword);
router.post("/forget-password/send-code", sendCodeToEmail);
router.post("/forget-password/verify", verifyCode);
router.post("/update-password", changeUserPassword);

module.exports = router;
