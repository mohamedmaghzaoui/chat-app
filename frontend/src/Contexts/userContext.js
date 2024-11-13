import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../services/userApi';

export const UserContext = createContext();

// UserProvider to fetch user data and provide it to children
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const userData = await getUser();
      setUsername(userData.first_name);
      setUserRole(userData.role.role_type);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching data
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // Empty dependency array to fetch data only once

  // Return loading UI while data is being fetched
  if (loading) {
    return <div>Loading...</div>; // Replace with your custom loading spinner or component
  }

  return (
    <UserContext.Provider value={{ username, userRole, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
