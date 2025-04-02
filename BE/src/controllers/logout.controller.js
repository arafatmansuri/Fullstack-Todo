function logout(req, res) {
  return res.clearCookie("accessToken", { path: "/" }).end();
}
module.exports = { logout };
