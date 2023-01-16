const express = require("express");

const routeMovies = express.Router();

const movies = [
  { id: 1, name: "The GodFather" },
  { id: 2, name: "Super Man" },
  { id: 3, name: "Super Man 2" },
];

routeMovies.get("/", (request, response) => {
  response.json(movies);
});

routeMovies.post("/", (request, response) => {
  const newMovie = { id: 4, name: "The GodFather 2" };
  movies.push(newMovie);
  response.status(201).json(newMovie);
});

routeMovies.put("/1", (request, response) => {
  response.status(200).json({ id: 1, name: "The GodFather" });
});

routeMovies.delete("/1", (request, response) => {
  response.status(200).json({ id: 1, name: "The GodFather" });
  // response.status(204).json({});
});

module.exports = {
  routeMovies,
};
