const Joi = require("joi");

const addMoviesSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = {
  addMoviesSchema,
};
