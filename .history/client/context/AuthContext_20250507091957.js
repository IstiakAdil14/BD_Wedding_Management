import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [clientDetailsSaved, setClientDetailsSaved] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("clientDetailsSaved");
      return saved === "true";
    }
    return false;
  });

  const [passwordSet, setPasswordSet] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("passwordSet");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentClientDetailsSaved =
        localStorage.getItem("clientDetailsSaved");
      if (
        currentClientDetailsSaved !== (clientDetailsSaved ? "true" : "false")
      ) {
        localStorage.setItem(
          "clientDetailsSaved",
          clientDetailsSaved ? "true" : "false"
        );
      }
      const currentPasswordSet = localStorage.getItem("passwordSet");
      if (currentPasswordSet !== (passwordSet ? "true" : "false")) {
        localStorage.setItem("passwordSet", passwordSet ? "true" : "false");
      }
    }
  }, [clientDetailsSaved, passwordSet]);

  const login = (token, email) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    if (email) {
      localStorage.setItem("email", email);
    }
  };

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
