const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const User = require("./users");

mongoose
  .connect("mongodb://ds047955.mlab.com:47955/pairprogramming", {
    useNewUrlParser: true,
    user: "abody",
    pass: "hWT59Z8%ZQ"
  })
  .then(res => {
    console.log("MongoDB connected");
  })
  .catch(error => console.log(error));

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world ♥️");
  res.end();
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const age = req.body.age;

  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "You must enter email and password" });
  }

  const encriptionSecret = "nwkhjbcwi";
  const hashPasswrod = crypto
    .createHmac("sha256", encriptionSecret)
    .update(password)
    .digest("hex");
  const user = new User({
    name: name,
    email: email,
    password: hashPasswrod,
    age: parseInt(age)
  });

  user
    .save()
    .then(response => {
      res.json({ messgae: "User is created" });
    })
    .catch(error => {
      res.status(500).status({ message: "User could not be added" });
    });
});

app.listen(3000, () => console.log("Server is running"));

// 401 unauthorized

// 403 forbidden

// 200 OK

// 500 Internal server error

// 404 not found
