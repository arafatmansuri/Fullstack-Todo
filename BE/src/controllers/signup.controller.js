const { UserModel } = require("../db/index.js");
const bcrypt = require("bcrypt");
const { z } = require("zod");

async function signup(req, res) {
  try {
    const requiredBody = z.object({
      username: z.string().min(3).max(30),
      password: z.string().min(3).max(100),
    });
    // const parsedData = requiredBody.parse(req.body)
    const safeParsedData = requiredBody.safeParse(req.body);
    if (!safeParsedData.success) {
      return res.status(402).json({
        message: "Invalid Format",
        error: `${
          safeParsedData.error.errors[0].path[0]
        }${safeParsedData.error.errors[0].message.replace("String", "")}`,
      });
    }
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res
        .status(300)
        .json({ message: "User already exists with this username" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "User signed in successfully", newUser });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong while creating user",
    });
  }
}

module.exports = { signup };
