import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [forceShowAuth, setForceShowAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const forceShow = localStorage.getItem("forceShowAuth") === "true";
    if (token) {
      setAccessToken(token);
    }
    if (forceShow) {
      setForceShowAuth(true);
      localStorage.removeItem("forceShowAuth");
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    setForceShowAuth(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setForceShowAuth(false);
  };

  const isAuthenticated = !!accessToken || forceShowAuth;

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
