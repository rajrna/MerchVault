// src/context/authContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Auth Context
const AuthContext = createContext();

// Create a Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if there's a saved token and verify user session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Example endpoint to check user authentication
          const response = await axios.get("/api/auth/check", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login Function
  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
