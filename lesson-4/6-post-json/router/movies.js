const express = require("express");
const { listMovies, getMovies, addMovie, removeMovie } = require("../db/db.js");
const { httpError } = require("../helpers/index.js");

const routeMovies = express.Router();

// const movies = [
//   { id: 1, name: "The GodFather" },
//   { id: 2, name: "Super Man" },
//   { id: 3, name: "Super Man 2" },
//   { id: 4, name: "Where the Crawdads Sing" },
//   { id: 5, name: "Vantage Point" },
//   { id: 6, name: "Side Effects" },
// ];

routeMovies.get("/", async (request, response) => {
  const movie = await listMovies();
  response.json(movie);
});

routeMovies.get("/:id", async (request, res, next) => {
  const { id } = request.params;
  const movie = await getMovies(id);
  if (!movie) {
    return next(httpError(404, "Movie not found"));
  }
  return res.json(movie);
});

routeMovies.post("/", async (request, response) => {
  const { title } = request.body;
  const newMovie = await addMovie(title);
  response.status(201).json(newMovie);
});

// routeMovies.put("/1", (request, response) => {
//   response.status(200).json({ id: 1, name: "The GodFather" });
// });

routeMovies.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  const movie = await getMovies(id);
  if (!movie) {
    next(httpError(404, "Not movie"));
  }
  await removeMovie(id);

  response.status(200).json(movie);
});

module.exports = {
  routeMovies,
};
