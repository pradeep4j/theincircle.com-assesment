import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/localStorage';

const PrivateRoute = ({ children }) => {
  if (isLoggedIn() === true) {
    // user is authenticated
    return <Navigate to="/home" />;
  }
  return children;
};

export default PrivateRoute;