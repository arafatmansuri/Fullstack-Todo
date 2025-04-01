const { Router } = require("express");
const {
  addTodo,
  getAllTodos,
  markAsDone,
  deleteTodo,
} = require("../controllers/todos.controller.js");
const { userAuth } = require("../middlewears/userAuth.middlewear.js");

const todoRouter = Router();

todoRouter.route("/add").post(addTodo);
todoRouter.route("/get").get(getAllTodos);
todoRouter.route("/status/:id").put(markAsDone);
todoRouter.route("/delete/:id").delete(deleteTodo);

module.exports = { todoRouter };
