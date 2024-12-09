import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../services/userApi';

export const UserContext = createContext();

// UserProvider to fetch user data and provide it to children
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  const getUserData = async () => {
    try {
      const response = await getUser();
      setUserData(response);
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
  }, [isRefresh]); // Empty dependency array to fetch data only once

  // Return loading UI while data is being fetched
  if (loading) {
    return <div>Loading...</div>; // Replace with your custom loading spinner or component
  }

  return (
    <UserContext.Provider
      value={{ setIsRefresh, userData, username, userRole, setUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};
