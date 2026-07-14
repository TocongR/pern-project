const projectRepository = require('../repositories/projectRepository');
const { NotFoundError, ForbiddenError } = require('../errors');

const getAllForUser = async (userId, { search, page, limit }) => {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    projectRepository.findAllByUser(userId, { search, skip, take: limit }),
    projectRepository.countByUser(userId, { search }),
  ]);

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const getById = async (projectId, userId) => {
  const project = await projectRepository.findById(projectId);
  if (!project) throw new NotFoundError('Project not found');
  if (project.userId !== userId) throw new ForbiddenError('You do not have access to this project');
  return project;
};

const create = (data, userId) => {
  return projectRepository.create({ ...data, userId });
};

const update = async (projectId, data, userId) => {
  await getById(projectId, userId);
  return projectRepository.update(projectId, data);
};

const remove = async (projectId, userId) => {
  await getById(projectId, userId);
  return projectRepository.remove(projectId);
};

module.exports = { getAllForUser, getById, create, update, remove };