const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  amount: Number,
  category: String,
  date: Date,
  notes: String,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  splitWith: [String]
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
