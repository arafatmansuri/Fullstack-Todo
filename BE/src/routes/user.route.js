const { Router } = require("express");
const { userAuth } = require("../middlewears/userAuth.middlewear.js");
const { getUser } = require("../controllers/user.controller.js");

const userRouter = Router();

userRouter.route("/getuser").get(userAuth, getUser);
module.exports = { userRouter };
