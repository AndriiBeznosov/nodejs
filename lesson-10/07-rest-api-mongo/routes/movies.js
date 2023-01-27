const express = require("express");
const { tryCatchWrapper } = require("../helpers/index.js");
const {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  uploadImage,
} = require("../controllers/movies.controller");
const { validateBody, upload } = require("../middlewares");
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
movieRouter.patch(
  "/:id/image",
  upload.single("image"),
  tryCatchWrapper(uploadImage),
);

module.exports = {
  movieRouter,
};
