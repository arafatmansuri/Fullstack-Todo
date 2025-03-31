const { Router } = require("express");
const { signin } = require("../controllers/signin.controller.js");
const signInrouter = Router();

signInrouter.route("/signin").post(signin);

module.exports = { signInrouter };
