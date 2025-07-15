import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [clientDetailsSaved, setClientDetailsSaved] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("clientDetailsSaved");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "clientDetailsSaved",
        clientDetailsSaved ? "true" : "false"
      );
    }
  }, [clientDetailsSaved]);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("clientDetailsSaved");
    setAccessToken(null);
    setClientDetailsSaved(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
