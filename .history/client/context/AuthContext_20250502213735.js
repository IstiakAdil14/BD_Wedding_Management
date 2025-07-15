import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [authVersion, setAuthVersion] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    setAuthVersion((v) => v + 1); // increment to force re-render
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setAuthVersion((v) => v + 1); // increment to force re-render
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, isAuthenticated, authVersion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
