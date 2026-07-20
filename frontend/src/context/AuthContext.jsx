import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setIsAuthenticated(true);
      setUser({ id: "persisted-user" });
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authApi.login(formData);

      localStorage.setItem("jwt", data.jwt);

      setUser({ id: data.id });
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      const message = err.message || "Login failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authApi.signup(formData);

      localStorage.setItem("jwt", data.jwt);

      setUser({
        id: data.id,
        name: data.name,
      });

      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      const message = err.message || "Signup failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);