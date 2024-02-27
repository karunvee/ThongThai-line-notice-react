// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {STORAGE_KEY_AUTH} from './Config';

const ProtectedRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem(STORAGE_KEY_AUTH);
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;