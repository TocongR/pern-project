const express = require('express');
const taskController = require('../controllers/taskController');
const { requireAuth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateQuery } = require('../middleware/validate');
const { createTaskSchema, updateTaskSchema, getTasksQuerySchema } = require('../validators/taskValidators');

const router = express.Router();
router.use(requireAuth);
router.patch('/:id', validate(updateTaskSchema), taskController.update);
router.delete('/:id', taskController.remove);

const projectTaskRouter = express.Router({ mergeParams: true });
projectTaskRouter.use(requireAuth);
projectTaskRouter.get('/', validateQuery(getTasksQuerySchema), taskController.getAllForProject);
projectTaskRouter.post('/', validate(createTaskSchema), taskController.create);

module.exports = { router, projectTaskRouter };