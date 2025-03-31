const express = require("express");
const cors = require("cors");
require("dotenv").config();
const signUpRouter = require("./src/routes/signup.route.js");
const app = express();

app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

app.use(signUpRouter);
app.get("/", (req, res) => {
  res.json({ message: "Server is running fine" });
});

module.exports = app;
