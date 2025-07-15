import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("AuthContext: Found accessToken in localStorage:", token);
      setAccessToken(token);
    }
  }, []);

  const login = (token) => {
    console.log("AuthContext: login called with token:", token);
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = () => {
    console.log("AuthContext: logout called");
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
