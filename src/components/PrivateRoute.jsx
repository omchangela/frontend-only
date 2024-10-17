import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    // If authenticated, render the children components; else redirect to login
    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
