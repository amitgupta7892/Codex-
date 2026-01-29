const Expense = require("../models/Expense");
const Group = require("../models/Group");

exports.addExpensePage = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId);
    if (!group) return res.send("Group not found");

    res.render("addExpense", { 
      group, 
      title: "Add Expense | SplitChain" 
    });
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { groupId, amount, category, date, notes, splitWith } = req.body;

    if (!groupId) return res.send("Group missing");

    const members = splitWith ? splitWith.split(",") : [];

    const expense = await Expense.create({
      group: groupId,
      amount,
      category,
      date,
      notes,
      paidBy: req.session.userId,
      splitWith: members
    });

    await Group.findByIdAndUpdate(groupId, {
      $push: { expenses: expense._id }
    });

    res.redirect(`/groups/${groupId}`);
  } catch (err) {
    console.log(err);
    res.send("Error adding expense");
  }
};
