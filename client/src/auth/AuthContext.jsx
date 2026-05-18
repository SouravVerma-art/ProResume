import React, { useEffect, useState } from 'react';
import api from '../configs/api';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from './storage';
import AuthContext from './auth-context';

const readStoredToken = () => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(AUTH_TOKEN_KEY) || '';
};

const readStoredUser = () => {
  if (typeof window === 'undefined') return null;

  const storedUser = window.localStorage.getItem(AUTH_USER_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    window.localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(readStoredToken());
  const [user, setUser] = useState(readStoredUser());
  const [isLoading, setIsLoading] = useState(Boolean(readStoredToken()));

  const persistAuth = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    window.localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
  };

  const clearAuth = () => {
    setToken('');
    setUser(null);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(AUTH_USER_KEY);
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    api
      .get('/api/auth/me')
      .then(({ data }) => {
        if (!isMounted) return;
        persistAuth(token, data.user);
      })
      .catch(() => {
        if (!isMounted) return;
        clearAuth();
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const register = async (payload) => {
    const { data } = await api.post('/api/auth/register', payload);
    persistAuth(data.token, data.user);
    return data.user;
  };

  const login = async (payload) => {
    const { data } = await api.post('/api/auth/login', payload);
    persistAuth(data.token, data.user);
    return data.user;
  };

  const googleLogin = async (credential) => {
    const { data } = await api.post('/api/auth/google', { credential });
    persistAuth(data.token, data.user);
    return data.user;
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isAuthenticated: Boolean(token && user?._id),
        register,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
