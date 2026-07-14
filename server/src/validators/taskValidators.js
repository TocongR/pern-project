const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(150),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
});

const getTasksQuerySchema = z.object({
  search: z.string().max(100).optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
});

module.exports = { createTaskSchema, updateTaskSchema, getTasksQuerySchema };