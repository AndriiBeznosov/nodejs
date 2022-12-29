// const fs = require('fs')

const fs = require("node:fs");

fs.readFile("./text.txt", { encoding: "utf8" }, (err, data) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(data);
});

fs.readFile("./text2.txt", { encoding: "utf8" }, (err, data2) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(data2);
});
