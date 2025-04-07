const { UserModel } = require("../db/index.js");
const bcrypt = require("bcrypt");


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
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res
        .status(300)
        .json({ message: "User already exists with this username" });
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "User signed in successfully", newUser });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: err.message || "Something went wrong while creating user",
      });
  }
}

module.exports = { signup };
