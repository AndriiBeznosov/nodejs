// const fs = require('fs')

const fs = require("node:fs");

function main() {
  const data = fs.readFileSync("./text.txt", { encoding: "utf8" });
  console.log(data);
}

main();
