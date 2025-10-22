import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-[#1B166430] via-[#ffffff40] to-[#1B166420] backdrop-blur-lg border-t border-white/20 text-gray-800 mt-16">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("About Arkan")}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            "Arkan provides the best crypto wallet and financial solutions for everyone."
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("Quick Links")}</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link to="/home" className="hover:text-[#1B1664FC] transition">{t("Home")}</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#1B1664FC] transition">{t("About Us")}</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#1B1664FC] transition">{t("Services")}</Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-[#1B1664FC] transition">{t("Blogs")}</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("Support")}</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link to="/contact" className="hover:text-[#1B1664FC] transition">{t("Contact Us")}</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#1B1664FC] transition">{t("Privacy Policy")}</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#1B1664FC] transition">{t("Terms & Conditions")}</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("Follow Us")}</h3>
          <div className="flex gap-4 text-gray-700">
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaTwitter /></a>
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaInstagram /></a>
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/20 py-4 mt-4 text-center text-sm text-gray-600">
        © {year} {t("Arkan")} - {t("All rights reserved")}
      </div>
    </footer>
  );
};

export default Footer;
