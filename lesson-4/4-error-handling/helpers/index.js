function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  tryCatchWrapper,
};
