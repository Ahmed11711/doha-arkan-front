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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WalletPage from "./pages/WalletPage";
// import Deposit from "./pages/Deposit";
// import Withdraw from "./pages/Withdraw";
// import Affiliate from "./pages/Affiliate";
import DoneToHome from "./pages/TwoFactor/DoneToHome";

import DashboardLayout from "./dashboard/DashboardLayout";
import DepositDashboard from "./dashboard/pages/Deposit";
import WithdrawDashboard from "./dashboard/pages/Withdraw";
import AffiliateDashboard from "./dashboard/pages/Affiliate";
import KYCDashboard from "./dashboard/pages/KYC";
import PrivacyPolicy from "./dashboard/pages/PrivacyPolicy";
import MyPortfolio from "./dashboard/pages/MyPortfolio";

function App() {
  const { i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
     if (auth !== isAuthenticated) {
      setIsAuthenticated(auth);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900  transition-all">
      {/* {isAuthenticated &&
        !window.location.pathname.startsWith("/dashboard") && (
          <Navbar toggleLanguage={toggleLanguage} />
        )} */}
      <Navbar toggleLanguage={toggleLanguage} />

      <main className="flex-grow">
        <ScrollToTop />

        <Routes>
          {/* ====== المسار الأساسي ====== */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* ====== صفحات عامة (غير محمية) ====== */}
          <Route
            path="/auth"
            element={<LoginRegister onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sell-wallets" element={<WalletPage />} />
          {/* <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/affiliate" element={<Affiliate />} /> */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ====== Two-Factor Auth ====== */}
          <Route path="/twofactor" element={<TwoFactor />} />
          <Route path="/twofactor/email" element={<EmailAuth />} />
          <Route path="/twofactor/sms" element={<SMSAuth />} />
          <Route path="/twofactor/google" element={<GoogleAuth />} />
          <Route path="/twofactor/done" element={<Done />} />
          <Route path="/twofactor/done-to-home" element={<DoneToHome />} />
          <Route
            path="/twofactor/uploadVerification"
            element={<UploadVerification />}
          />

          {/* ====== Dashboard (Protected Only) ====== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="deposit" element={<DepositDashboard />} />
            <Route path="withdraw" element={<WithdrawDashboard />} />
            <Route path="affiliate" element={<AffiliateDashboard />} />
            <Route path="kyc" element={<KYCDashboard />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="my-portfolio" element={<MyPortfolio />} />
          </Route>

          {/* ====== مسار غير موجود ====== */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
      {/* {isAuthenticated &&
        !window.location.pathname.startsWith("/dashboard") && <Footer />} */}
    </div>
  );
}

export default App;
