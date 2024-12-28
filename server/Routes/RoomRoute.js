const router = require("express").Router();
const { approveRoom, deleteRoom } = require("../Controller/Room");

router.patch("/room/approve/:id", approveRoom);
router.delete("/room/delete/:id", deleteRoom);

module.exports = router;
