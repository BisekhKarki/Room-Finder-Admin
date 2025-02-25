const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../Controller/Admin");
const protectRoute = require("../Middleware/ProtectRoute");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", protectRoute, getUserDetails);

module.exports = router;
