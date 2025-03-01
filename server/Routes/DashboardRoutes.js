const express = require("express");
const router = express.Router();
const { getTotals } = require("../Controller/Dashboard");
const protectRoute = require("../Middleware/ProtectRoute");

router.get("/get/Total", protectRoute, getTotals);

module.exports = router;
