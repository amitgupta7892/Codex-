const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const auth = require("../middleware/auth");

router.get("/", auth, groupController.groupPage);
router.post("/create", auth, groupController.createGroup);
router.get("/:id", auth, groupController.groupDetails);

module.exports = router;
