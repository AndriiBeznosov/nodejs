const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

const { connectMongo } = require("./src/db/connection");
const { postsRouter } = require("./src/routers/postsRouter");
const { authRouter } = require("./src/routers/authRouter");
const { errorHandler } = require("./src/helpers/apiHelpers");

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");

    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
