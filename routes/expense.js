const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/auth");

// GET page to add expense
router.get("/add/:groupId", auth, expenseController.addExpensePage);

// POST new expense (Amount + Category + Notes + SplitWith)
router.post("/add", auth, expenseController.addExpense);

module.exports = router;
