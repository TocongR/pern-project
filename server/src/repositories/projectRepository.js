const prisma = require('../config/db');

const findAllByUser = (userId, { search, skip, take }) => {
  return prisma.project.findMany({
    where: {
      userId,
      ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
    skip,
    take,
  });
};

const countByUser = (userId, { search }) => {
  return prisma.project.count({
    where: {
      userId,
      ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
    },
  });
};

const findById = (id) => {
  return prisma.project.findUnique({ where: { id } });
};

const create = ({ name, description, userId }) => {
  return prisma.project.create({ data: { name, description, userId } });
};

const update = (id, data) => {
  return prisma.project.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.project.delete({ where: { id } });
};

module.exports = { findAllByUser, countByUser, findById, create, update, remove };