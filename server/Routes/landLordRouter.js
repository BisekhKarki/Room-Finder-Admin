const router = require("express").Router();
const { deleteLandLord, getAllLandlord } = require("../Controller/Landlord");
const protectRoute = require("../Middleware/ProtectRoute");

router.delete("/delete/landlord/:id", deleteLandLord);
router.get("/users/all/landlord", protectRoute, getAllLandlord);

module.exports = router;
