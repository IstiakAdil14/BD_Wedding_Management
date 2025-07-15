import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("clientDetailsSaved");
    localStorage.removeItem("passwordSet");
    setAccessToken(null);
    setClientDetailsSaved(false);
    setPasswordSet(false);
  };

  const forceUpdate = () => {
    setUpdateFlag((prev) => !prev);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isAuthenticated,
        forceUpdate,
        clientDetailsSaved,
        setClientDetailsSaved,
        passwordSet,
        setPasswordSet,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
