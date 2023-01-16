const db = require("../db/db");
const { httpError } = require("../helpers/index.js");

async function getMovies(request, response) {
  const { limit } = request.query;
  const movie = await db.listMovies({ limit });
  response.json(movie);
}

async function getMovie(request, res, next) {
  const { id } = request.params;
  const movie = await db.getMovies(id);
  if (!movie) {
    return next(httpError(404, "Movie not found"));
  }
  return res.json(movie);
}

async function createMovie(request, response, next) {
  const { name } = request.body;
  //   if (!title) {
  //     return next(httpError(400, "Title is required !!!"));
  //   }

  //   const schema = Joi.object({
  //     title: Joi.string().min(3).required(),
  //   });
  //   const { error } = schema.validate(request.body);
  //   if (error) {
  //     return next(httpError(400, error.message));
  //   }
  const newMovie = await db.addMovie(name);
  response.status(201).json(newMovie);
}

async function refreshMovie(req, res, next) {
  const { id } = req.params;
  const { year } = req.body;
  const movie = await db.patchMovie(id, year);

  res.status(200).json(movie);
}

async function deleteMovie(request, response, next) {
  const { id } = request.params;
  const movie = await db.getMovies(id);
  if (!movie) {
    return next(httpError(404, "Not movie"));
  }
  await db.removeMovie(id);

  return response.status(200).json(movie);
}

module.exports = {
  deleteMovie,
  createMovie,
  getMovie,
  getMovies,
  refreshMovie,
};
