import {
  FaMoon,
  FaSun,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ theme, toggleTheme, toggleLanguage }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isArabic = i18n.language === "ar";

  const navItems = [
    { path: "/home", label: isArabic ? "الرئيسية" : "Home" },
    { path: "/about", label: isArabic ? "من نحن" : "About Us" },
    { path: "/services", label: isArabic ? "الخدمات" : "Services" },
    { path: "/blogs", label: isArabic ? "المدونات" : "Blogs" },
    { path: "/sell-wallets", label: isArabic ? "بيع المحافظ" : "Sell Wallets" },
    { path: "/contact", label: isArabic ? "تواصل معنا" : "Contact Us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full max-w-full z-50 flex justify-between items-center 
  py-3 px-4 md:py-4 md:px-6 transition-all
  bg-gradient-to-r from-[#1B166430] via-[#ffffff40] to-[#1B166420]
  dark:from-[#1B166480] dark:via-[#2a2a4a60] dark:to-[#1B166450]
  backdrop-blur-lg border-b border-white/10 dark:border-gray-700/30`}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
        ARKAN
      </Link>

      {/* Desktop Menu */}
      <ul
        className={`hidden md:flex items-center gap-6 px-8 py-3 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/40 dark:border-gray-600/40 shadow-md overflow-hidden">
 ${isArabic ? "flex-row-reverse" : "flex-row"}`}
      >
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`text-base font-medium transition ${
                location.pathname === item.path
                  ? "text-[#1B1664FC] dark:text-yellow-400"
                  : "text-gray-700 dark:text-gray-200 hover:text-[#1B1664FC] dark:hover:text-yellow-400"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div
        className={`flex items-center gap-4 ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/40 dark:border-gray-600/40 shadow-md">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-[#1B1664FC] text-white hover:bg-[#372E8B] text-sm transition"
          >
            {isArabic ? "En" : "Ar"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200/60 dark:bg-gray-600/60 text-gray-800 dark:text-yellow-400 transition flex items-center justify-center"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        <div className="relative hidden md:block">
          <button
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/40 dark:border-gray-600/40 shadow-md text-gray-800 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-600/50 transition"
          >
            <FaUser />
          </button>

          {openDropdown && (
            <div
              className={`absolute mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg w-40 overflow-hidden z-50 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setOpenDropdown(false)}
              >
                <FaSignInAlt /> {isArabic ? "تسجيل الدخول" : "Sign In"}
              </Link>
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setOpenDropdown(false)}
              >
                <FaUserPlus /> {isArabic ? "إنشاء حساب" : "Sign Up"}
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-gray-800 dark:text-gray-200 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute top-full left-0 w-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-t border-white/20 dark:border-gray-700/40 flex flex-col items-center py-6 space-y-4 md:hidden ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-medium transition ${
                location.pathname === item.path
                  ? "text-[#1B1664FC] dark:text-yellow-400"
                  : "text-gray-700 dark:text-gray-200 hover:text-[#1B1664FC] dark:hover:text-yellow-400"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-md bg-[#1B1664FC] text-white hover:bg-[#372E8B] text-sm transition"
            >
              {isArabic ? "En" : "Ar"}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200/60 dark:bg-gray-600/60 text-gray-800 dark:text-yellow-400 transition flex items-center justify-center"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          {/* Login Links in mobile */}
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/40 dark:bg-gray-700/40 hover:bg-white/60 dark:hover:bg-gray-600/60 text-gray-800 dark:text-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaSignInAlt /> {isArabic ? "تسجيل الدخول" : "Sign In"}
            </Link>
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/40 dark:bg-gray-700/40 hover:bg-white/60 dark:hover:bg-gray-600/60 text-gray-800 dark:text-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserPlus /> {isArabic ? "إنشاء حساب" : "Sign Up"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
