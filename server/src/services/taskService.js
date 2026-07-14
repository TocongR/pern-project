const taskRepository = require('../repositories/taskRepository');
const projectService = require('./projectService');
const { NotFoundError } = require('../errors');

const getAllForProject = async (projectId, userId, filters) => {
  await projectService.getById(projectId, userId); // ownership check
  return taskRepository.findAllByProject(projectId, filters);
};

const create = async (projectId, data, userId) => {
  await projectService.getById(projectId, userId);
  return taskRepository.create({ ...data, projectId });
};

const getTaskWithOwnershipCheck = async (taskId, userId) => {
  const task = await taskRepository.findById(taskId);
  if (!task) throw new NotFoundError('Task not found');
  await projectService.getById(task.projectId, userId);
  return task;
};

const update = async (taskId, data, userId) => {
  await getTaskWithOwnershipCheck(taskId, userId);
  return taskRepository.update(taskId, data);
};

const remove = async (taskId, userId) => {
  await getTaskWithOwnershipCheck(taskId, userId);
  return taskRepository.remove(taskId);
};

module.exports = { getAllForProject, create, update, remove };