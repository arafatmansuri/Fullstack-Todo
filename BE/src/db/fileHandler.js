const fs = require("fs");
function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/todo.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
function writeFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + "/todo.json", JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = { readFile, writeFile };
