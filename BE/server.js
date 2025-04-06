const app = require("./app.js");
require("dotenv").config();
const port = process.env.PORT || 3001;
const users = [
  {
    username: "abc",
    password: "1234",
    tasks: ["wake up at 5", "study node at 10"],
  },
];
module.exports = { users };
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
