const router = require("express").Router();
const deleteLandLord = require("../Controller/Landlord");

router.delete("/delete/landlord/:id", deleteLandLord);

module.exports = router;
