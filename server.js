var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var User = require('./models/User.js')
var auth = require('./auth.js')

mongoose.Promise = Promise;

// API
var posts = [{ message: "hello" }, { message: "Have a good day" }];

// API
var tests = [{ test: "test1" }, { test: "test Pass" }];

// API
var starsWars = [
  (goods = { good: "yoda", god: "Luke" }),

  (bads = { bads: "vader" })
];

app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/users", async (req, res) => {
  try {
    var users = await User.find({}, "-password -__v");
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    var user = await User.findById(req.params.id, "-password -__v");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.get("/starWars", (req, res) => {
  res.send(starsWars);
});

mongoose.connect(
  "mongodb://test:test123@ds111623.mlab.com:11623/pssocial",
  { useNewUrlParser: true },
  err => {
    if (!err) console.log("Connected to mongo");
  }
);

app.use('/auth', auth)
app.listen(3000);
console.log("App running on port 3000");
