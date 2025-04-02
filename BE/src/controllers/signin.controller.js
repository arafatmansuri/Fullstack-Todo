const { readFile, writeFile } = require("../db/fileHandler.js");
const jwt = require("jsonwebtoken");
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
    const users = await readFile();
    const currentUserIndex = users.findIndex((user) => {
      return user.username === username;
    });
    if (currentUserIndex == -1) {
      return res
        .status(404)
        .json({ message: "User not found with this username" });
    }
    if (!(users[currentUserIndex].password === password)) {
      return res.status(402).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    users[currentUserIndex].accessToken = token;
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    await writeFile(users);
    return res.cookie("accessToken", token, options).status(200).json({
      message: "User signed in successfully",
      user: users[currentUserIndex],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong while creating user", err });
  }
}

module.exports = { signin };
