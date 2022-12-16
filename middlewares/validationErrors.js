const { validationResult } = require("express-validator");

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      error: errors.errors[0].msg,
    });
  }
  next();
};

module.exports = validationErrors;
