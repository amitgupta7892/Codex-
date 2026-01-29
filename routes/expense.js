const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/auth");

router.get("/add/:groupId", auth, expenseController.addExpensePage);
router.post("/add", auth, expenseController.addExpense);

module.exports = router;
