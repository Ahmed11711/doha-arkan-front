import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  }, []);

  // 🟡 تسجيل الدخول
  const login = (userData, userToken) => {
    localStorage.setItem("Auth_Token", userToken);
    localStorage.setItem("userData", JSON.stringify(userData));

    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  const updateUser = (newUserData) => {
    setUser((prev) => {
      if (!prev) return newUserData;

      // نحافظ على البيانات القديمة اللي في localStorage
      const updated = { ...prev, ...newUserData };

      // ❌ ما نحفظش الرصيد في localStorage
      const { user_balance, ...userWithoutBalance } = updated;
      localStorage.setItem("userData", JSON.stringify(userWithoutBalance));

      return updated; // نرجع كل الداتا بما فيها الرصيد في الـ state فقط
    });
  };

  // 🔴 تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("Auth_Token");
    localStorage.removeItem("userData");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

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
