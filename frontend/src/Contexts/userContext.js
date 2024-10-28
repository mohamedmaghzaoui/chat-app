import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
//always sens credentials with evry axios request
axios.defaults.withCredentials = true;

export const UserContext = createContext();
//get  username and userRoles from server if user is connected and pass them to all children
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userRoles, setUserRoles] = useState("");

  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user");

      setUsername(response.data.name);

      setLoading(false);
      console.log(username);
      console.log(userRoles);
    } catch (error) {
      setUsername("");
      setUserRoles("");

      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername, userRoles }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
