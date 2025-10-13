import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginRegister from "./pages/LoginRegister";
import TwoFactor from "./pages/TwoFactor/TwoFactor";
import EmailAuth from "./pages/TwoFactor/EmailAuth";
import SMSAuth from "./pages/TwoFactor/SMSAuth";
import GoogleAuth from "./pages/TwoFactor/GoogleAuth";
import Done from "./pages/TwoFactor/Done";
import UploadVerification from "./pages/TwoFactor/UploadVerification";

function App() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // ✅ لما المستخدم يعمل تسجيل دخول
  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <h1 className="text-center pt-20 text-3xl">Home Page</h1>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/auth"
            element={<LoginRegister onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/twofactor" element={<TwoFactor />} />
          <Route path="/twofactor/email" element={<EmailAuth />} />
          <Route path="/twofactor/sms" element={<SMSAuth />} />
          <Route path="/twofactor/google" element={<GoogleAuth />} />
          <Route path="/twofactor/done" element={<Done />} />
          <Route path="/twofactor/uploadVerification" element={<UploadVerification />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
