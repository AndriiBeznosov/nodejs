const { User } = require("../models/user");

async function getMovies(req, res) {
  const { user } = req;

  const userWithMovies = await User.findById(user._id).populate("movies", {
    title: 1,
    id: 1,
    _id: 1,
  });

  res.status(201).json({ data: { movies: userWithMovies.movies } });
}

async function createMovie(req, res, next) {
  const { user } = req;
  const { id: movieId } = req.body;
  user.movies.push({ _id: movieId });

  // const userUpdate = await User.findByIdAndUpdate(user._id, user, {
  //   new: true,
  //   fields: {
  //     movies: 1,
  //   },
  // });
  const userUpdate = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).select({ movies: 1, _id: 0 });

  res.status(201).json({ data: { movies: userUpdate.movies } });
}

async function me(req, res, next) {
  const { user } = req;
  const { email, _id: userId, movies } = user;
  return res.status(200).json({
    user: {
      email,
      userId,
      movies,
    },
  });
}

module.exports = {
  getMovies,
  createMovie,
  me,
};
