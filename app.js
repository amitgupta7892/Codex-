require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(session({
  secret: "codex_secret_key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findById(req.session.userId).select("name");
  } else {
    res.locals.user = null;
  }
  next();
});

app.use("/", require("./routes/auth"));
app.use("/groups", require("./routes/group"));
app.use("/expenses", require("./routes/expense"));

app.get("/", (req, res) => res.render("index"));

app.listen(3000, () => console.log("Server running"));
