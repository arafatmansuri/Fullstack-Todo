const { Router } = require("express");
const {
  addTodo,
  getAllTodos,
  markAsDone,
} = require("../controllers/todos.controller.js");
const { userAuth } = require("../middlewears/userAuth.middlewear.js");

const todoRouter = Router();

todoRouter.route("/add").post(userAuth, addTodo);
todoRouter.route("/get").get(userAuth, getAllTodos);
todoRouter.route("/done/:id").put(userAuth, markAsDone);

module.exports = { todoRouter };
