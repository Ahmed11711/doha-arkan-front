import { FaMoon, FaSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = ({ theme, toggleTheme, toggleLanguage }) => {
  const { i18n } = useTranslation();

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-all">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        ARKAN
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          className="px-3 py-2 rounded-md bg-[#1B1664FC] text-white hover:bg-[#372E8B] transition"
        >
          {i18n.language === "ar" ? "English" : "العربية"}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition flex items-center justify-center"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
