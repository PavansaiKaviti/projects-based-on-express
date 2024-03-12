const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(express.static(path.join(__dirname, "public")));
// creating a client
const uri =
  "mongodb+srv://pavansai_kaviti:Pavansai12345@pavansai.59krwiq.mongodb.net/student_database";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/home.html"));
  const name = req.query.name;
  const gender = req.query.gender;
  const age = req.query.age;
  const college = req.query.college;
  const cgpa = req.query.cgpa;
  //console.log(name, age, gender, college, cgpa);
  //connecting client
  const connectclient = async () => {
    try {
      await client.connect();
      const dump = {
        name: name,
        gender: gender,
        age: age,
        college: college,
        cgpa: cgpa,
      };
      const user = client.db("user");
      const user_info = user.collection("data");
      const set_up = await user_info.insertOne(dump);
      console.log(set_up);
    } catch (error) {
      console.log("error message:", error);
    }
  };
  connectclient();
});

app.listen(port, (error) => {
  if (error) {
    console.log("server can't be created");
  } else {
    console.log(
      ` server created at port :${port} can be read from http://localhost:${port}`
    );
  }
});
