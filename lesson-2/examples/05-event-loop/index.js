const fs = require("node:fs");

function hendleFile(err, data) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("got data", data);

  const end = Date.now() + 5000;

  while (Date.now() < end) {} //? block event loop

  console.log("hendle fild end!!!");
}

console.log("start");
fs.readFile("./text2.txt", { encoding: "utf8" }, hendleFile);
console.log("finish");
