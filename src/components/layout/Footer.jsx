import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ isArabic }) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const links = t("footer.links", { returnObjects: true });
  const policies = t("footer.policies", { returnObjects: true });

  return (
    <footer className="w-full bg-gradient-to-r from-[#1B166430] via-[#ffffff40] to-[#1B166420] backdrop-blur-lg border-t border-white/20 text-gray-800 mt-16">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
          <h3 className={`text-lg font-semibold text-[#1B1664] ${isArabic ? "text-right" : "text-left"}`}>{t("footer.aboutTitle")}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{t("footer.aboutText")}</p>
        </div>

        {/* Quick Links */}
        <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("footer.quickLinks")}</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link to={`/${link.replace(/\s+/g, "").toLowerCase()}`} className="hover:text-[#1B1664FC] transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Policies */}
        <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("footer.support")}</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {policies.map((policy, idx) => (
              <li key={idx}>
                <Link to={`/${policy.replace(/\s+/g, "").toLowerCase()}`} className="hover:text-[#1B1664FC] transition">
                  {policy}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
          <h3 className="text-lg font-semibold text-[#1B1664]">{t("footer.contact")}</h3>
          <p className="text-gray-700 text-sm">{t("footer.email")}</p>
          <p className="text-gray-700 text-sm">{t("footer.hq")}</p>
          <p className="text-gray-700 text-sm">{t("footer.regional")}</p>
          <p className="text-gray-700 text-sm">{t("footer.legal")}</p>

          <div className="flex gap-4 mt-2 text-gray-700 justify-start">
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaTwitter /></a>
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaInstagram /></a>
            <a href="#" className="hover:text-[#1B1664FC] transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/20 py-4 mt-4 text-center text-sm text-gray-600">
        © {year} ZAYAM ROCK — {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
