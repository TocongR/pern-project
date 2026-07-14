const { ValidationError } = require('../errors');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.flatten().fieldErrors;
    throw new ValidationError('Invalid request data', details);
  }
  req.body = result.data;
  next();
};

const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const details = result.error.flatten().fieldErrors;
    throw new ValidationError('Invalid query parameters', details);
  }
  req.validatedQuery = result.data; // don't reassign req.query — read-only in Express 5
  next();
};

module.exports = validate;
module.exports.validateQuery = validateQuery;