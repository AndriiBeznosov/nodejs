const { HttpError } = require("../httpError");

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HttpError(error.message, 400);
      }
    } catch (error) {
      return res.status(error.code).json({
        message: error.message,
      });
    }

    return next();
  };
}

module.exports = {
  validateBody,
};

// const Joi = require("joi");
// const { HttpError } = require("../httpError");

// module.exports = {
//   addPostValidation: (req, res, next) => {
//     const schema = Joi.object({
//       topic: Joi.string().min(3).max(30).required(),
//       text: Joi.string().min(30).max(400).required(),
//     });

//     const validationResult = schema.validate(req.body);

//     if (validationResult.error) {
//       const { message } = validationResult.error;
//       throw new HttpError(message, 400);
//     }
//     next();
//   },
//   patchPostValidation: (req, res, next) => {
//     const schema = Joi.object({
//       topic: Joi.string().min(3).max(30).optional(),
//       text: Joi.string().min(30).max(400).optional(),
//     });

//     const validationResult = schema.validate(req.body);
//     if (validationResult.error) {
//       const { message } = validationResult.error;
//       throw new HttpError(message, 400);
//     }
//     next();
//   },
// };
