const router = require("express").Router();
const user = require("../Controller/User");

router.delete("/delete/user/:id", user);

module.exports = router;
