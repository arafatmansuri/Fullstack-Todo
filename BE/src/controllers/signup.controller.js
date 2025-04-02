const { readFile, writeFile } = require("../db/fileHandler.js");

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    if (
      [username, password].some((field) => {
        return field === "";
      })
    ) {
      return res.status(402).json({ message: "All fields are required" });
    }
    const newUser = {
      username: username,
      password: password,
      tasks: [],
    };
    const users = await readFile();
    // const users = await JSON.parse(data);
    if (
      users.find((user) => {
        return user.username === username;
      })
    ) {
      return res
        .status(300)
        .json({ message: "User already exists with this username" });
    }
    users.push(newUser);
    await writeFile(users);
    return res
      .status(200)
      .json({ message: "User signed in successfully", newUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong while creating user", err });
  }
}

module.exports = { signup };
