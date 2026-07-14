const prisma = require('../config/db');

const findAllByProject = (projectId, { search, status }) => {
  return prisma.task.findMany({
    where: {
      projectId,
      ...(status ? { status } : {}),
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
};

const findById = (id) => {
  return prisma.task.findUnique({ where: { id } });
};

const create = ({ title, description, status, projectId }) => {
  return prisma.task.create({ data: { title, description, status, projectId } });
};

const update = (id, data) => {
  return prisma.task.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.task.delete({ where: { id } });
};

module.exports = { findAllByProject, findById, create, update, remove };