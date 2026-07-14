const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');
const { ConflictError, UnauthorizedError } = require('../errors');

const SALT_ROUNDS = 10;

const register = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError('An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepository.create({ name, email, passwordHash });

  const token = generateToken({ userId: user.id, email: user.email });

  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = generateToken({ userId: user.id, email: user.email });

  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token };
};

const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new UnauthorizedError('User no longer exists');
  }
  return user;
};

module.exports = { register, login, getCurrentUser };