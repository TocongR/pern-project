import axiosInstance from './axiosInstance';

export const getTasksRequest = (projectId, params) =>
  axiosInstance.get(`/projects/${projectId}/tasks`, { params }).then((res) => res.data.data.tasks);

export const createTaskRequest = (projectId, data) =>
  axiosInstance.post(`/projects/${projectId}/tasks`, data).then((res) => res.data.data.task);

export const updateTaskRequest = (id, data) =>
  axiosInstance.patch(`/tasks/${id}`, data).then((res) => res.data.data.task);

export const deleteTaskRequest = (id) =>
  axiosInstance.delete(`/tasks/${id}`).then((res) => res.data.data);