const prisma = require('../config/db');

const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const findById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, createdAt: true },
  });
};

const create = ({ name, email, passwordHash }) => {
  return prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, email: true, name: true, createdAt: true },
  });
};

module.exports = { findByEmail, findById, create };