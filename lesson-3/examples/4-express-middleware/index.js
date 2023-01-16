const { json } = require("express");
const express = require("express");
const app = express();

const movies = [
  { id: 1, name: "The GodFather" },
  { id: 2, name: "Super Man" },
];

const user = [
  { id: 2022, name: "Andrii" },
  { id: 2021, name: "Anna" },
];

app.use((request, respons, next) => {
  console.log("incoming request", {
    method: request.method,
    path: request.path,
  });

  next();
});

app.use((request, respons, next) => {
  console.log("middlewere 2");

  next();
});

app.get("/movies", (request, response) => {
  response.status(200).json(movies);
});

app.get("/users", (request, response) => {
  response.status(200).json(user);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !!!");
});
