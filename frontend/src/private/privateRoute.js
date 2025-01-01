import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../Contexts/userContext';

//if user is logged in return sensor element else navigate to login
export const PrivateRoute = ({ element }) => {
  const { userData } = useContext(UserContext);

  return userData ? element : <Navigate to="/" />;
};
