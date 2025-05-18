const router = require("express").Router();
const { deleteUser, getAllUser, getTenants } = require("../Controller/User");
const protectRoute = require("../Middleware/ProtectRoute");

router.delete("/delete/user/:id", protectRoute, deleteUser);
router.get("/user/all/details", protectRoute, getAllUser);

module.exports = router;
