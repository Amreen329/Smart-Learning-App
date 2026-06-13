import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");

      if (
        !userData ||
        userData === "undefined" ||
        userData === "null"
      ) {
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (data) => {
    try {
      if (data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
        setUser(data.user);
      } else {
        console.warn("No user data received from backend");
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
