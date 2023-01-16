const express = require("express");
const morgan = require("morgan");

require("dotenv").config;

const app = express();
const { postRouter } = require("./src/routers/postRouter.js");

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/posts", postRouter);

app.listen(PORT, (error) => {
  if (error) {
    return console.error("Error at aserver launch:", error);
  }
  console.log(`Server works at port ${PORT}`);
});
