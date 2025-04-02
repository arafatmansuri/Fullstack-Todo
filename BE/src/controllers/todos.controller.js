const { readFile, writeFile } = require("../db/fileHandler");
async function getUsers() {
  const users = await readFile();
  return users;
}
async function addTodo(req, res) {
  try {
    const todo = req.body.todo;
    if (todo === "") {
      return res.status(300).json({ message: "Todo can't be empty" });
    }
    const user = req.user;
    const users = await getUsers();
    const currentUserIndex = users.findIndex((value) => {
      return user.username === value.username;
    });
    if (currentUserIndex == -1) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong from our side,User not found" });
    }
    const newTodo = {
      id: Date.now(),
      todo: todo,
      createdAt: new Date(),
      status: false,
    };
    users[currentUserIndex].tasks.push(newTodo);
    await writeFile(users);
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
    const todoId = Number(req.params.id);
    if (todoId === "") {
      return res.status(402).json({ message: "Todo Id can't be empty" });
    }
    const user = req.user;
    const users = await getUsers();
    const currentUserIndex = users.findIndex((value) => {
      return user.username === value.username;
    });
    if (currentUserIndex == -1) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong from our side,User not found" });
    }
    const currentTaskIndex = users[currentUserIndex].tasks.findIndex(
      (value) => {
        return todoId === value.id;
      }
    );
    if (currentTaskIndex == -1) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong from our side,Task not found" });
    }
    if (users[currentUserIndex].tasks[currentTaskIndex].status) {
      users[currentUserIndex].tasks[currentTaskIndex].status = false;
    } else {
      users[currentUserIndex].tasks[currentTaskIndex].status = true;
    }
    await writeFile(users);
    return res.status(200).json({
      message: "Task Marked as done",
      task: users[currentUserIndex].tasks[currentTaskIndex],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something unexpected occured from our side" });
  }
}

async function getAllTodos(req, res) {
  const user = req.user;
  return res
    .status(200)
    .json({ message: "Tasks fetched successfully", tasks: user.tasks });
}
async function deleteTodo(req, res) {
  try {
    const todoId = Number(req.params.id);
    if (todoId === "") {
      return res.status(402).json({ message: "Todo Id can't be empty" });
    }
    const user = req.user;
    const users = await getUsers();
    const currentUserIndex = users.findIndex((value) => {
      return user.username === value.username;
    });
    if (currentUserIndex == -1) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong from our side,User not found" });
    }
    const currentTaskIndex = users[currentUserIndex].tasks.findIndex(
      (value) => {
        return todoId === value.id;
      }
    );
    if (currentTaskIndex == -1) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong from our side,Task not found" });
    }
    const deletedTodo = users[currentUserIndex].tasks.splice(
      currentTaskIndex,
      1
    );
    await writeFile(users);
    return res.status(200).json({
      message: "Task Deleted successfully",
      task: deletedTodo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something unexpected occured from our side" });
  }
}

async function getAllTodos(req, res) {
  const user = req.user;
  return res
    .status(200)
    .json({ message: "Tasks fetched successfully", tasks: user.tasks });
}

module.exports = { addTodo, getAllTodos, markAsDone, deleteTodo };
