const Joi = require("joi");

const addPostValidation = Joi.object({
  topic: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(30).max(400).required(),
});

const patchPostValidation = Joi.object({
  topic: Joi.string().min(3).max(30).optional(),
  text: Joi.string().min(30).max(400).optional(),
});

module.exports = {
  addPostValidation,
  patchPostValidation,
};
