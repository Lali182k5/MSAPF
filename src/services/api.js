import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  signup: data => api.post('/api/auth/signup', data),
  login: data => api.post('/api/auth/login', data)
};

export const postApi = {
  list: () => api.get('/api/posts'),
  create: formData => api.post('/api/posts', formData),
  like: id => api.post(`/api/posts/${id}/like`),
  comment: (id, text) => api.post(`/api/posts/${id}/comment`, { text })
};

export default api;
