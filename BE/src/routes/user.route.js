const { Router } = require("express");
const { userAuth } = require("../middlewears/userAuth.middlewear.js");
const { getUser } = require("../controllers/user.controller.js");
const { logout } = require("../controllers/logout.controller.js");

const userRouter = Router();

userRouter.route("/getuser").get(userAuth, getUser);
userRouter.route("/logout").get(userAuth, logout);
module.exports = { userRouter };
