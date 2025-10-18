import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 mt-auto border-t border-gray-200 dark:border-gray-700 transition-all">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-start">
        <p className="text-sm">
          © {new Date().getFullYear()} {t("footer.company") || "My Website"}.{" "}
          {t("footer.rights") || "All rights reserved."}
        </p>

        <div className="flex gap-4">
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.privacy") || "Privacy Policy"}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.terms") || "Terms"}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.contact") || "Contact"}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
