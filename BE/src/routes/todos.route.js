const { Router } = require("express");
const { addTodo } = require("../controllers/todos.controller.js");
const { userAuth } = require("../middlewears/userAuth.middlewear.js");

const todoRouter = Router();

todoRouter.route("/add").post(userAuth, addTodo);

module.exports = { todoRouter };
