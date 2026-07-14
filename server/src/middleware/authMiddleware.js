const { verifyToken } = require('../utils/jwt');
const { UnauthorizedError } = require('../errors');
const asyncHandler = require('../utils/asyncHandler');

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError('No authentication token provided');
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired token');
  }
});

module.exports = { requireAuth };