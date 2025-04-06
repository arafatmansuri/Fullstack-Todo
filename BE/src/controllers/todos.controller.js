const { TodoModel } = require("../db");
async function addTodo(req, res) {
  try {
    const todo = req.body.todo;
    if (todo === "") {
      return res.status(300).json({ message: "Todo can't be empty" });
    }
    const user = req.user;
    const newTodo = await TodoModel.create({
      todo: todo,
      user: user._id,
    });
    return res
      .status(200)
      .json({ message: "Task added successfully", newTodo });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something unexpected occured from our side" });
  }
}
async function markAsDone(req, res) {
  try {
    const todoId = req.params.id;
    if (todoId === "") {
      return res.status(402).json({ message: "Todo Id can't be empty" });
    }
    const todo = await TodoModel.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (todo.status) {
      todo.status = false;
    } else {
      todo.status = true;
    }
    await todo.save({ validateBeforeSave: false });
    return res.status(200).json({
      message: "Task Marked as done",
      task: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something unexpected occured from our side" });
  }
}

async function getAllTodos(req, res) {
  const user = req.user;
  const Todos = await TodoModel.find({ user: user._id });
  return res.status(200).json({ message: "Tasks fetched successfully", Todos });
}
async function deleteTodo(req, res) {
  try {
    const todoId = req.params.id;
    if (todoId === "") {
      return res.status(402).json({ message: "Todo Id can't be empty" });
    }
    const todo = await TodoModel.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({
      message: "Task Deleted successfully",
      task: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something unexpected occured from our side" });
  }
}
module.exports = { addTodo, getAllTodos, markAsDone, deleteTodo };
