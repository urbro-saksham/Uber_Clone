import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 track loading

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/me', {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        setUser(null); // user not logged in
      } finally {
        setLoading(false); // 👈 done loading, either way
      }
    };

    fetchUser();
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
