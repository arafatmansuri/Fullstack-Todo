const { Router } = require("express");
const { addTodo, getAllTodos } = require("../controllers/todos.controller.js");
const { userAuth } = require("../middlewears/userAuth.middlewear.js");

const todoRouter = Router();

todoRouter.route("/add").post(userAuth, addTodo);
todoRouter.route("/get").get(userAuth, getAllTodos);

module.exports = { todoRouter };
