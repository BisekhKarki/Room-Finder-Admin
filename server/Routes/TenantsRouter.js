const express = require("express");
const { getAllTenants } = require("../Controller/Tenants");
const protectRoute = require("../Middleware/ProtectRoute");

const router = express.Router();

router.get("/user/all/tenants", protectRoute, getAllTenants);

module.exports = router;
