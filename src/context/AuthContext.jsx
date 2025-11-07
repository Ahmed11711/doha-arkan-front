import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ حالة تحميل

  // 🟢 تحميل البيانات من localStorage لما التطبيق يفتح
  useEffect(() => {
    const storedToken = localStorage.getItem("Auth_Token");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }

    setLoading(false); // ✅ خلصنا تحميل البيانات
  }, []);

  // 🟡 تسجيل الدخول
  const login = (userData, userToken) => {
    localStorage.setItem("Auth_Token", userToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("user_id", userData.id); 

    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  const updateUser = (newUserData) => {
    setUser((prev) => {
      if (!prev) return newUserData;

      const updated = { ...prev, ...newUserData };
      // eslint-disable-next-line no-unused-vars
      const { user_balance, ...userWithoutBalance } = updated;
      localStorage.setItem("userData", JSON.stringify(userWithoutBalance));

      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem("Auth_Token");
    localStorage.removeItem("userData");
    localStorage.setItem("isAuthenticated", false); 

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // ✅ لو لسه بيحمّل البيانات من localStorage
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
