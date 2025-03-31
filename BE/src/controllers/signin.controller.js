const { readFile, writeFile } = require("../db/fileHandler.js");

async function signin(req, res) {
  try {
    const { username, password } = req.body;
    if (
      [username, password].some((field) => {
        return field === "";
      })
    ) {
      return res.status(402).json({ message: "All fields are required" });
    }
    const data = await readFile();
    const users = await JSON.parse(data);
    const currentUserIndex = users.findIndex((user) => {
      return user.username === username;
    });
    if (!currentUserIndex) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    if (!users[currentUserIndex].password === password) {
      return res.status(402).json({ message: "Invalid Password" });
    }
    users[currentUserIndex].accessToken = "jbvjbvjd"
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

module.exports = { signin };
