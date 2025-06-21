import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const backendurl=process.env.REACT_APP_API_URL;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loadUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken && (storedUser !== user || storedToken !== token)) {
      setUser(storedUser);
      setToken(storedToken);
    }

    // console.log("Loaded user:", storedUser, "Token:", storedToken);
  };
  // console.log("Loaded user:", user, "Token:", token);

  useEffect(() => {
    console.log('hello')
    loadUserData();
  }, []);


  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // ✅ Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await fetch(`${backendurl}/alluser`);
      const data = await response.json();

      //   console.log("Users fetched:", data); // ✅ Debugging API response

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Invalid API response (users):", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${backendurl}/allpost`);
      const data = await response.json();

      //   console.log("Posts fetched:", data); // ✅ Debugging API response

      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("Invalid API response (posts):", data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  React.useEffect(() => {
    getAllUsers();
    getAllPosts(); // Fetch all posts on component mount
  }, [posts]);

  return (
    <AuthContext.Provider value={{ users, posts }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
