const fs = require("fs");

exports.readFileContent = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};
