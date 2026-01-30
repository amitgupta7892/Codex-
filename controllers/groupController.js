const Group = require("../models/Group");
const Expense = require("../models/Expense");

// GET: All groups of logged-in user
exports.groupPage = async (req, res) => {
  try {
    const groups = await Group.find({ owner: req.session.userId });
    res.render("groups", { groups, title: "Your Groups | SplitChain", user: req.user });
  } catch (err) {
    console.log(err);
    res.render("groups", { groups: [] });
  }
};

// POST: Create a new group
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

// GET: Single group page with expenses & notes
exports.groupDetails = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("expenses");
    if (!group) return res.send("Group not found");

    // Ensure notes array exists for rendering
    if (!group.notes) group.notes = [];

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

// POST: Add a new note to the group
exports.addNote = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.send("Group not found");

    if (!group.notes) group.notes = [];
    group.notes.push(req.body.note); // add note to DB
    await group.save();

    res.redirect(`/groups/${group._id}`); // redirect to same page
  } catch (err) {
    console.log(err);
    res.send("Error adding note");
  }
};
