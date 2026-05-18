import axios from 'axios';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../auth/storage';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080'
});

api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const requestUrl = error?.config?.url || '';
        const isAuthRequest =
            requestUrl.includes('/api/auth/login') || requestUrl.includes('/api/auth/register');

        if (status === 401 && !isAuthRequest) {
            window.localStorage.removeItem(AUTH_TOKEN_KEY);
            window.localStorage.removeItem(AUTH_USER_KEY);

            if (!window.location.pathname.startsWith('/login')) {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
