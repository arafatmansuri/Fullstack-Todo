const { UserModel } = require("../db/index.js");
const jwt = require("jsonwebtoken");
async function signin(req, res) {
  try {
    const { username, password } = req.body;
    if ([username, password].some((field) => field === "")) {
      return res.status(402).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this username" });
    }
    if (!(user.password === password)) {
      return res.status(402).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    user.accessToken = token;
    await user.save({ validateBeforeSave: true });
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    return res.cookie("accessToken", token, options).status(200).json({
      message: "User signed in successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong while creating user",
    });
  }
}

module.exports = { signin };
