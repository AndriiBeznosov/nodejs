const express = require("express");
const { tryCatchWrapper } = require("../helpers/index.js");
const {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
} = require("../controllers/movies.controller");
const { validateBody } = require("../middlewares");
const { addMovieSchema } = require("../schemas/movies");
const movieRouter = express.Router();

movieRouter.get("/", tryCatchWrapper(getMovies));
movieRouter.get("/:id", tryCatchWrapper(getMovie));
movieRouter.post(
  "/",
  validateBody(addMovieSchema),
  tryCatchWrapper(createMovie),
);
movieRouter.delete("/:id", tryCatchWrapper(deleteMovie));

module.exports = {
  movieRouter,
};
