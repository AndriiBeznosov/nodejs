const express = require("express");
const { tryCatchWrapper } = require("../helpers");
const {
  deleteMovie,
  createMovie,
  getMovie,
  getMovies,
  refreshMovie,
} = require("../controllers/movies.controller");
const { validateBody } = require("../middlewares");
const { addMoviesSchema } = require("../schemas");

const routerMovies = express.Router();

routerMovies.get("/", tryCatchWrapper(getMovies));
routerMovies.get("/:id", tryCatchWrapper(getMovie));
routerMovies.post(
  "/",
  validateBody(addMoviesSchema),
  tryCatchWrapper(createMovie),
);
routerMovies.delete("/:id", tryCatchWrapper(deleteMovie));

routerMovies.patch("/:id", tryCatchWrapper(refreshMovie));

module.exports = {
  routerMovies,
};
