const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const auth = require("../middleware/auth");

// GET all groups of logged-in user
router.get("/", auth, groupController.groupPage);

// POST: Create new group
router.post("/create", auth, groupController.createGroup);

// GET single group page (Members + Expenses + Notes)
router.get("/:id", auth, groupController.groupDetails);

// ✅ POST route to add a note
router.post("/:id/add-note", auth, groupController.addNote);

module.exports = router;
