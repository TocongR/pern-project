import axiosInstance from './axiosInstance';

export const registerRequest = (data) =>
  axiosInstance.post('/auth/register', data).then((res) => res.data.data);

export const loginRequest = (data) =>
  axiosInstance.post('/auth/login', data).then((res) => res.data.data);

export const logoutRequest = () =>
  axiosInstance.post('/auth/logout').then((res) => res.data.data);

export const getMeRequest = () =>
  axiosInstance.get('/auth/me').then((res) => res.data.data);