//!requireing modules
const { strict } = require("assert");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const mongostore = require("connect-mongo");
//url for mongoosedb
const url =
  "mongodb+srv://pavansai_kaviti:Pavansai12345@pavansai.59krwiq.mongodb.net/user_details";
//! accessing modules
const app = express();
const port = 8080;
//middleware built in
app.use(
  session({
    secret: "kps7093",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: mongostore.create({ mongoUrl: url }),
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//specifying engine
app.set("view engine", "ejs");
//connecting a clientdb to mongooose
const clientdb = async () => {
  try {
    await mongoose.connect(url);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("error in connected :", error);
  }
};
clientdb();
//*creating schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});
//*creating model
const Userbd = mongoose.model("Userbd", userSchema);
//!app.set("views", path.join(__dirname, "views"));
//mimic db
// const userbd = [
//   { name: "pavansai", password: "12345", role: "Admin" },
//   { name: "dino", password: "67890", role: "User" },
// ];
// responding to a server request
//home
app.get("/", (req, res) => {
  res.render("home");
});
//login
app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    const userfound = (await Userbd.findOne({ username }))
      ? await Userbd.findOne({ username })
      : false;
    if (userfound && userfound.password === password) {
      //!save the data into server
      req.session.userData = {
        username: userfound.username,
        role: userfound.role,
      };
      res.redirect("/dashboard");
    } else {
      res.redirect("/register");
    }
  });
//! changes made here regester
app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const { username, password } = req.body;
    //console.log(inserted_userdata);
    Userbd.create({ username, password, role: "admin" });
    res.redirect("/login");
  });
//dashboard
app.get("/dashboard", async (req, res) => {
  console.log(req.session);
});
//dashboard
app.get("/logout", (req, res) => {
  res.clearCookie("UserCookie");
  res.redirect("/login");
});
//admin
app.get("/admin", (req, res) => {
  res.render("admin");
});
// listenting to port
app.listen(port, (error) => {
  try {
    console.log(`port is listening at: http://localhost:${port}`);
  } catch (error) {
    console.log("error message :", error);
  }
});
