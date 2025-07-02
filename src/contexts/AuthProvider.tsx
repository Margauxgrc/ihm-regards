import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [project, setProject] = useState(() => localStorage.getItem('project'));

  const login = (token, expires_in, project) => {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + expires_in * 1000);

    localStorage.setItem('authToken', token);
    localStorage.setItem('expiry', expiryTime.toJSON());
    localStorage.setItem('project', project);

    setAuthToken(token);
    setProject(project);
  };

  const logout = () => {
    setAuthToken(null);
    setProject(null);

    localStorage.removeItem('authToken');
    localStorage.removeItem('expiry');
    localStorage.removeItem('project');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiryString = localStorage.getItem('expiry');
    const savedProject = localStorage.getItem('project');

    if (!token || !expiryString || !savedProject) {
      logout();
      return;
    }

    const expiry = new Date(expiryString);
    if (expiry < new Date()) {
      logout();
    } else {
      setAuthToken(token);
      setProject(savedProject);
    }
  }, []);

  return <AuthContext.Provider value={{ authToken, project, login, logout }}>{children}</AuthContext.Provider>;
};
