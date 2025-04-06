const { UserModel } = require("../db");

async function logout(req, res) {
  await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        accessToken: undefined,
      },
    },
    { new: true }
  );
  return res.clearCookie("accessToken", { path: "/" }).end();
}
module.exports = { logout };
