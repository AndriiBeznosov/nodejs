const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { routeMovies } = require("./router/movies");
const { tryCatchWrapper } = require("./helpers");

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));

//server static
app.use("/", express.static("public"));
// app.use("/public", express.static("public"));

//redirect
app.get("/myhome", (request, response) => {
  response.redirect(302, "/home");
});

app.get("/home", (request, response) => {
  response.send("<h2>Home</h2>");
});

//error
//1
app.get("/api/error", (request, response) => {
  //..тут має бути логіка
  throw new Error("Something bad happened!");
});
//2
app.get("/api/error2", async (request, response, next) => {
  //...тут має бути логіка
  //...await
  try {
    throw new Error("Something bad happened 2!");
  } catch (error) {
    next(error);
  }
});
//3
app.get(
  "/api/error3",
  tryCatchWrapper(async (request, response, next) => {
    throw new Error("Something bad happened 3!");
  }),
);

//routes
app.use("/api/movies", routeMovies);

//404
app.use((request, response) => {
  response.status(404).json({ message: "Not Found. Щось пішло не так!!!" });
});

//error hendling
app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error("API Error:", err.message);

  res.status(500).json({ message: "Internal server error!!!" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !!!");
});
