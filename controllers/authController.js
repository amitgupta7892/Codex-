const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.loginPage = (req, res) => {
  res.render("login", { title: "Login | SplitChain" });
};

exports.registerPage = (req, res) => {
  res.render("register", { title: "Register | SplitChain" });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, wallet } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.send("User already exists");

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      wallet
    });

    req.session.userId = user._id;
    res.redirect("/groups");
  } catch (err) {
    console.log(err);
    res.send("Register error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.send("Wrong password");

    req.session.userId = user._id;
    res.redirect("/groups");
  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
