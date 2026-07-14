const projectService = require('../services/projectService');
const asyncHandler = require('../utils/asyncHandler');

const getAll = asyncHandler(async (req, res) => {
  const { projects, pagination } = await projectService.getAllForUser(req.user.id, req.validatedQuery);
  res.status(200).json({ success: true, data: { projects, pagination } });
});

const getOne = asyncHandler(async (req, res) => {
  const project = await projectService.getById(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: { project } });
});

const create = asyncHandler(async (req, res) => {
  const project = await projectService.create(req.body, req.user.id);
  res.status(201).json({ success: true, data: { project } });
});

const update = asyncHandler(async (req, res) => {
  const project = await projectService.update(req.params.id, req.body, req.user.id);
  res.status(200).json({ success: true, data: { project } });
});

const remove = asyncHandler(async (req, res) => {
  await projectService.remove(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: { message: 'Project deleted' } });
});

module.exports = { getAll, getOne, create, update, remove };