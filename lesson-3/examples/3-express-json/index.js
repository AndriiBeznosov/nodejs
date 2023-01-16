const { json } = require("express");
const express = require("express");
const app = express();

const movies = [{ id: 1, name: "The GodFather" }];

app.get("/movies", (require, response) => {
  response.json(movies);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !!!");
});
