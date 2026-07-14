const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax', // 'none' required for cross-domain cookies in production
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  res.cookie('token', token, cookieOptions);
  res.status(201).json({ success: true, data: { user } });
});

const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  res.cookie('token', token, cookieOptions);
  res.status(200).json({ success: true, data: { user } });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.status(200).json({ success: true, data: { message: 'Logged out' } });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  res.status(200).json({ success: true, data: { user } });
});

module.exports = { register, login, logout, getMe };