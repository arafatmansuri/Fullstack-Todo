const { Router } = require("express");
const { signup } = require("../controllers/signup.controller.js");
const router = Router();

router.route("/signup").post(signup);

module.exports = router;
