const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const signUpRouter = require("./src/routes/signup.route.js");
const { signInrouter } = require("./src/routes/signin.route.js");
const { userRouter } = require("./src/routes/user.route.js");
const { todoRouter } = require("./src/routes/todos.route.js");
const app = express();
//common middlewears:
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());

//App middlewears:
app.use(signUpRouter);
app.use(signInrouter);
app.use(userRouter);
app.use("/todo", todoRouter);
app.get("/", (req, res) => {
  res.json({ message: "Server is running fine" });
});

module.exports = app;
