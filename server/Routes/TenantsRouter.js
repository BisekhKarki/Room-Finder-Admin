const express = require("express");
const { getAllTenants, deleteTenants } = require("../Controller/Tenants");
const protectRoute = require("../Middleware/ProtectRoute");

const router = express.Router();

router.get("/user/all/tenants", protectRoute, getAllTenants);
router.delete("/delete/tenants/:id", protectRoute, deleteTenants);

module.exports = router;
