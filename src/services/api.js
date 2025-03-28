import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const getUsers = (page = 1) => {
  return api.get(`/users?page=${page}`);
};

export const updateUser = (userId, userData) => {
  return api.put(`/users/${userId}`, userData);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};