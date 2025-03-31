const { readFile, writeFile } = require("../db/fileHandler");
const _ = require("lodash");
async function users(a) {
  const data = await readFile();
  const users = await JSON.parse(data);
  return users;
}
async function addTodo(req, res) {
  try {
    const todo = req.body.todo;
    if (todo === "") {
      return res.status(402).json({ message: "Todo can't be empty" });
    }
    const user = req.user;
    const data = await readFile();
    const users = await JSON.parse(data);
    const currentUserIndex = users.findIndex((value) => {
      return user.username === value.username;
    });
    if (currentUserIndex == -1) {
      return res
        .status(500)
        .json({ message: "Somthing went wrong from our side,User not found" });
    }
    const newTodo = {
      id: _.uniqueId(),
      todo: todo,
      createdAt: new Date(),
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

async function getAllTodos(req, res) {
  const user = req.user;
  return res
    .status(200)
    .json({ message: "Tasks fetched successfully", tasks: user.tasks });
}

module.exports = { addTodo, getAllTodos };
