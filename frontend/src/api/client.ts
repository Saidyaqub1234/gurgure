import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const lang = localStorage.getItem('lang');
  if (lang && ['en', 'fa', 'ps'].includes(lang)) {
    config.headers['X-Language'] = lang;
  }
  // Check if this is an admin route or customer route
  const url = config.url || '';
  if (url.includes('/admin/')) {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = localStorage.getItem('customer_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      if (url.includes('/admin/')) {
        localStorage.removeItem('admin_token');
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      } else {
        localStorage.removeItem('customer_token');
        localStorage.removeItem('customer');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
