function getUser(req, res) {
  const user = req.user;
  return res
    .status(200)
    .json({ message: "User data fetched successfully", user });
}
module.exports = { getUser };
