const express = require("express");
const { listMovies, getMovies } = require("../db/db.js");
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
  console.log(id);
  const movie = await getMovies(id);
  if (!movie) {
    return next(httpError(404, "Movie not found"));
  }
  return res.json(movie);
});

// routeMovies.get("/2", (request, response) => {
//   response.json(movies[1]);
// });

// routeMovies.post("/", (request, response) => {
//   const newMovie = { id: 4, name: "The GodFather 2" };
//   movies.push(newMovie);
//   response.status(201).json(newMovie);
// });

// routeMovies.put("/1", (request, response) => {
//   response.status(200).json({ id: 1, name: "The GodFather" });
// });

// routeMovies.delete("/1", (request, response) => {
//   response.status(200).json({ id: 1, name: "The GodFather" });
//   // response.status(204).json({});
// });

module.exports = {
  routeMovies,
};
