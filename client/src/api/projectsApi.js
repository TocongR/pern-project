import axiosInstance from './axiosInstance';

export const getProjectsRequest = (params) =>
  axiosInstance.get('/projects', { params }).then((res) => res.data.data);

export const getProjectRequest = (id) =>
  axiosInstance.get(`/projects/${id}`).then((res) => res.data.data.project);

export const createProjectRequest = (data) =>
  axiosInstance.post('/projects', data).then((res) => res.data.data.project);

export const updateProjectRequest = (id, data) =>
  axiosInstance.patch(`/projects/${id}`, data).then((res) => res.data.data.project);

export const deleteProjectRequest = (id) =>
  axiosInstance.delete(`/projects/${id}`).then((res) => res.data.data);