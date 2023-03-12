import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/localStorage';

const PrivateRoute = ({ children }) => {
  if (isLoggedIn() === false) {

    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;