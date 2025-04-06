const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");

async function userAuth(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken || req.header("authorization");
    if (!accessToken) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decodedInfo = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await UserModel.findById(decodedInfo.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
module.exports = { userAuth };
