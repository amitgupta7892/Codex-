const Group = require("../models/Group");
const Expense = require("../models/Expense");

exports.groupPage = async (req, res) => {
  try {
    const groups = await Group.find({ owner: req.session.userId });
    res.render("groups", { groups, title: "Your Groups | SplitChain" , user: req.user});
  } catch (err) {
    console.log(err);
    res.render("groups", { groups: [] });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    await Group.create({
      name,
      members: members ? members.split(",") : [],
      owner: req.session.userId
    });

    res.redirect("/groups");
  } catch (err) {
    console.log(err);
    res.send("Group creation failed");
  }
};

exports.groupDetails = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.send("Group not found");

    const expenses = await Expense.find({ group: req.params.id });

    res.render("groupDetails", { 
      group, 
      expenses, 
      title: "Group | SplitChain" 
    });
  } catch (err) {
    console.log(err);
    res.send("Group not found");
  }
};
