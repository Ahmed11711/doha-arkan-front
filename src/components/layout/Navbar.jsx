import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";
import ApiClient from "../../services/API";

const Navbar = ({ toggleLanguage }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthenticated, logout, updateUser } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isArabic = i18n.language === "ar";
  const isLoggedIn = isAuthenticated;
  const userName = user?.name || "";

  const handleLogout = () => {
    logout();
    enqueueSnackbar(
      isArabic ? "تم تسجيل الخروج بنجاح ✅" : "Logged out successfully ✅",
      { variant: "success" }
    );
    navigate("/auth");
  };

  useEffect(() => {
    if (isAuthenticated) {
      ApiClient.get("/me").then((res) => {
        updateUser(res.data);
      });
    }
  }, [isAuthenticated]);

  const navItems = isArabic
    ? [
        { path: "/home", label: "الرئيسية" },
        { path: "/about", label: "من نحن" },
        { path: "/services", label: "الخدمات" },
        { path: "/blogs", label: "المدونات" },
        { path: "/dashboard", label: "لوحة التحكم" },
        { path: "/contact", label: "تواصل معنا" },
      ]
    : [
        { path: "/home", label: "Home" },
        { path: "/about", label: "About Us" },
        { path: "/services", label: "Services" },
        { path: "/blogs", label: "Blogs" },
        { path: "/dashboard", label: "Dashboard" },
        { path: "/contact", label: "Contact Us" },
      ];

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center 
      py-3 px-4 md:py-4 md:px-6 transition-all
      bg-gradient-to-r from-[#1B166430] via-[#ffffff40] to-[#1B166420]
      backdrop-blur-lg border-b border-white/10 `}
    >
      <Link
        to="/"
        className="text-3xl font-extrabold tracking-wide 
    px-6 py-2 rounded-full 
    bg-gradient-to-r from-[#1B1664]/90 to-[#322FA4]/90 
    text-white shadow-lg border border-white/20 
    backdrop-blur-md hover:shadow-xl hover:scale-105 hover:from-[#322FA4] hover:to-[#1B1664]
    transition-all duration-300 ease-in-out"
      >
        Zayamrock
      </Link>

      <ul
        dir={isArabic ? "rtl" : "ltr"}
        className={`hidden md:flex items-center gap-6 px-8 py-3 rounded-full backdrop-blur-md bg-white/30 border border-white/40 shadow-md         }`}
      >
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`text-base font-medium transition ${
                location.pathname === item.path
                  ? "text-[#1B1664FC]"
                  : "text-gray-700 hover:text-[#1B1664FC]"
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
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/30 border border-white/40 shadow-md">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-[#1B1664FC] text-white hover:bg-[#372E8B] text-sm transition"
          >
            {isArabic ? "En" : "Ar"}
          </button>
        </div>

        <div className="relative hidden md:block">
          <button
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/30 border border-white/40 shadow-md text-gray-800 hover:bg-white/50 transition"
          >
            <div className="relative">
              <FaUser className="text-lg" />
              {user?.affiliate_code_active && (
                <span className="absolute -top-3 right-3 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
              )}
            </div>

            {isLoggedIn && userName && (
              <span className="text-sm font-medium truncate max-w-[120px]">
                {userName}
              </span>
            )}
          </button>

          {openDropdown && (
            <div
              className={`absolute mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg w-44 overflow-hidden z-50 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setOpenDropdown(false)}
                  >
                    <FaSignInAlt /> {isArabic ? "تسجيل الدخول" : "Sign In"}
                  </Link>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setOpenDropdown(false)} 
                  >
                    <FaUserPlus /> {isArabic ? "إنشاء حساب" : "Sign Up"}
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setOpenDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  <FaSignOutAlt /> {isArabic ? "تسجيل الخروج" : "Logout"}
                </button>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute top-full left-0 w-full bg-white/70 backdrop-blur-md border-t border-white/20 flex flex-col items-center py-6 space-y-4 md:hidden ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-medium transition ${
                location.pathname === item.path
                  ? "text-[#1B1664FC]"
                  : "text-gray-700 hover:text-[#1B1664FC]"
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
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/auth"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/40 hover:bg-white/60 text-gray-800 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaSignInAlt /> {isArabic ? "تسجيل الدخول" : "Sign In"}
                </Link>
                <Link
                  to="/auth"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/40 hover:bg-white/60 text-gray-800 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUserPlus /> {isArabic ? "إنشاء حساب" : "Sign Up"}
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-500/70 hover:bg-red-600/80 text-white transition"
              >
                <FaSignOutAlt /> {isArabic ? "تسجيل الخروج" : "Logout"}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
