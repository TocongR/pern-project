const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const { requireAuth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { validateQuery } = require('../middleware/validate');
const { createProjectSchema, updateProjectSchema, getProjectsQuerySchema } = require('../validators/projectValidators');

router.use(requireAuth);

router.get('/', validateQuery(getProjectsQuerySchema), projectController.getAll);
router.post('/', validate(createProjectSchema), projectController.create);
router.get('/:id', projectController.getOne);
router.patch('/:id', validate(updateProjectSchema), projectController.update);
router.delete('/:id', projectController.remove);

module.exports = router;