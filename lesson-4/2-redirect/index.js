const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { routeMovies } = require("./router/movies");

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

//routes
app.use("/api/movies", routeMovies);

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !!!");
});
