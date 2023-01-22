const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret";

const main = () => {
  const payload = { id: "301288" };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5s" }); //30 seconds
  console.log(token);
  //ex1 - check in valid
  try {
    const verefication = jwt.verify(token, JWT_SECRET);
    console.log("ex1 check in valid", verefication);
  } catch (error) {
    console.error("ERROR ex1 check in valid:", error.name);
  }
  //ex2 check in valid expired error
  try {
    const token2 =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMTI4OCIsImlhdCI6MTY3NDIxNTM0MCwiZXhwIjoxNjc0MjE1MzQ1fQ.KIY9Eo3CLckKgOGIzF6ZYtoHwl6rK4Fcy8cwAHSdMeU";
    const verefication2 = jwt.verify(token2, JWT_SECRET);
    console.log("ex2 check in valid", verefication2);
  } catch (error) {
    console.error("ERROR ex2 check in valid:", {
      name: error.name,
      message: error.message,
    });
  }
  //ex3 check in valid invalid signature
  try {
    const JWT_SECRET2 = "20304050";
    const verefication3 = jwt.verify(token, JWT_SECRET2);
    console.log("ex3 check in valid", verefication3);
  } catch (error) {
    console.error("ERROR ex3 check in valid:", {
      name: error.name,
      message: error.message,
    });
  }
};

main();
