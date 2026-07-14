const taskService = require('../services/taskService');
const asyncHandler = require('../utils/asyncHandler');

const getAllForProject = asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllForProject(req.params.projectId, req.user.id, req.validatedQuery);
  res.status(200).json({ success: true, data: { tasks } });
});

const create = asyncHandler(async (req, res) => {
  const task = await taskService.create(req.params.projectId, req.body, req.user.id);
  res.status(201).json({ success: true, data: { task } });
});

const update = asyncHandler(async (req, res) => {
  const task = await taskService.update(req.params.id, req.body, req.user.id);
  res.status(200).json({ success: true, data: { task } });
});

const remove = asyncHandler(async (req, res) => {
  await taskService.remove(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: { message: 'Task deleted' } });
});

module.exports = { getAllForProject, create, update, remove };