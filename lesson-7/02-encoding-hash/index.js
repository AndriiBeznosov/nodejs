// const base64 = require("base-64");
// const md5 = require("md5");
const bcrypt = require("bcrypt");

(async function () {
  const start = "123456789";
  // encoding
  //   const encodingStart = base64.encode(start);
  //   console.log("-----------", encodingStart);
  //   const coding = base64.decode(encodingStart);
  //   console.log("=========", coding);
  // heching
  //   const encodingStart = md5(start);
  //   console.log("-----------", encodingStart);
  // const coding = base64.decode(encodingStart);
  // console.log("=========", coding);
  // bcrypt
  const salt = await bcrypt.genSalt();
  hashed = await bcrypt.hash(start, salt);
  console.log("heshed:", hashed);

  const isTheSame = await bcrypt.compare("123456789", hashed);
  console.log("isTheSame", isTheSame);
})();
