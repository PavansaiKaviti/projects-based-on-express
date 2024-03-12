//!requireing modules
const { strict } = require("assert");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
//url for mongoosedb
const url =
  "mongodb+srv://pavansai_kaviti:Pavansai12345@pavansai.59krwiq.mongodb.net/user_details";
//! accessing modules
const app = express();
const port = 8080;
//middleware built in
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
const userSchema = new mongoose.Schema({ username: String, password: String });
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
    console.log(username);
    //console.log(typeof username);
    const userfound = (await Userbd.findOne({ username }))
      ? await Userbd.findOne({ username })
      : false;
    //console.log(userfound && userfound.password === password);
    // const user1 = userfound.username;
    //console.log(typeof user1);
    // const decision =
    //   userfound.username === Username && userfound.password === Password
    //? true
    //     : false;
    // console.log(decision);
    if (userfound && userfound.password === password) {
      res.cookie("UserCookie", JSON.stringify(userfound), {
        maxAge: 3 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      //res.render("dashboard");
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
    Userbd.create({ username, password });
    res.redirect("/login");
  });
//dashboard
app.get("/dashboard", async (req, res) => {
  //grab user name from cookie
  const { username, password } = JSON.parse(req.cookies.UserCookie);
  // console.log(username, password);
  // ? JSON.parse(req.cookies.UserCookie)
  // : false;
  //console.log(parsecookieuser.name);
  const parseuserfound = await Userbd.findOne({ username });
  //console.log(parseuserfound);
  if (parseuserfound) {
    //console.log("authorized");
    res.render("dashboard");
  } else {
    res.redirect("/login");
    //console.log("failed");
  }
});
//dashboard
app.get("/logout", (req, res) => {
  res.clearCookie("UserCookie");
  res.redirect("/login");
});
// listenting to port
app.listen(port, (error) => {
  try {
    console.log(`port is listening at: http://localhost:${port}`);
  } catch (error) {
    console.log("error message :", error);
  }
});
