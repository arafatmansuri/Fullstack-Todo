const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const signUpRouter = require("./src/routes/signup.route.js");
const { signInrouter } = require("./src/routes/signin.route.js");
const { userRouter } = require("./src/routes/user.route.js");
const { todoRouter } = require("./src/routes/todos.route.js");
const { userAuth } = require("./src/middlewears/userAuth.middlewear.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const app = express();
//common middlewears:
app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

//App middlewears:
app.use(signUpRouter);
app.use(signInrouter);
app.use(userRouter);
app.use("/todo", userAuth, todoRouter);
app.get("/", (req, res) => {
  res.json({ message: "Server is running fine" });
});

module.exports = app;
