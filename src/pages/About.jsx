import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import about from "../assets/images/about.webp";
import m1 from "../assets/images/m1.webp";
import m2 from "../assets/images/m2.jpg";
import m3 from "../assets/images/m3.jpg";
import m4 from "../assets/images/m4.jpg";
import m5 from "../assets/images/m5.jpg";
import m6 from "../assets/images/m6.webp";
import { useNavigate } from "react-router-dom";
export default function About() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="font-[Rubik]">
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${about})` }}
      >
        <div
          className={`relative z-10 text-white max-w-2xl ${
            isArabic ? "ms-5 text-right" : "ms-5 text-left"
          }`}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {isArabic ? "من نحن" : "Who We Are"}
          </span>

          <h3 className="text-4xl md:text-6xl font-bold mb-4 font-[Rubik]">
            {isArabic
              ? "ZAYAM ROCK شركة استثمارية"
              : "ZAYAM ROCK is an investment management company"}
          </h3>

          <p className="text-lg mb-4 font-[Rubik] leading-relaxed">
            {isArabic
              ? "ZAYAM ROCK شركة استثمارية متخصصة في إدارة المحافظ وتنمية رأس المال، يقع مقرها الرئيسي في الدوحة – قطر، مع تواجد إقليمي في دبي – الإمارات."
              : "ZAYAM ROCK is an investment management company headquartered in Doha, Qatar with a regional presence in Dubai, UAE."}
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* About Section */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              className="text-5xl font-bold mb-6 text-[#1B1664]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t("Who We Are")}
            </motion.h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              {t(
                "ZAYAM ROCK is an investment management company headquartered in Doha, Qatar with a regional presence in Dubai, UAE."
              )}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t(
                "We focus on real performance and sustainable capital growth, managing investments professionally with disciplined strategies."
              )}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t(
                "Our approach is based on transparency, trust, and long‑term value."
              )}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t(
                "We invest as if it’s our own capital — because your success is our success."
              )}
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#1B1664] hover:bg-[#15104F] text-white px-6 py-3 rounded-full transition"
            >
              {t("CTA")}
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto my-16 px-6">
          <div className="bg-gradient-to-r from-[#1B1664] to-[#3A36A1] text-white py-14 px-8 rounded-[3rem] shadow-lg">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
              {[
                { num: "500+", label: t("Successful Trades") },
                { num: "600+", label: t("Happy Clients") },
                { num: "7+", label: t("Years of Experience") },
              ].map((item, i) => (
                <div key={i} className="px-4 py-4">
                  <h3 className="text-4xl font-bold mb-2">{item.num}</h3>
                  <p className="text-gray-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={about}
              alt={t("Founder")}
              className="rounded-3xl shadow-2xl w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="order-1 md:order-2 bg-gradient-to-br from-[#f8f8ff] to-[#ecebff] p-10 rounded-3xl shadow-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1B1664]">
              {t("Mission")}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg italic mb-6">
              {t(
                "Our mission is to empower investors with professional, smart and performance‑driven investment solutions — without complexity."
              )}
            </p>
            <h2 className="text-2xl font-semibold text-[#1B1664] mb-2">
              {t("Values")}
            </h2>
            <ul className="text-gray-700 leading-relaxed list-disc list-inside mb-4">
              <li>{t("Integrity — We invest as if it’s our own capital.")}</li>
              <li>
                {t("Transparency — Clear reporting and open communication.")}
              </li>
              <li>
                {t("Growth — Long‑term wealth creation with smart strategies.")}
              </li>
              <li>
                {t(
                  "Flexibility — Portfolio access and adaptive risk management."
                )}
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Partners Section */}
        <section className="max-w-6xl mx-auto py-24 px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-[#1B1664]">
            {isArabic ? "شركاؤنا" : "Our Partners"}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {[
              {
                name: "Qatar Investment Group",
                role: isArabic ? "الاستثمار والتمويل" : "Investment & Finance",
                img: m1,
              },
              {
                name: "Dubai Capital",
                role: isArabic ? "الشريك المالي" : "Financial Partner",
                img: m2,
              },
              {
                name: "Smart Vision",
                role: isArabic ? "الاستشارات التقنية" : "Technology Consulting",
                img: m3,
              },
              {
                name: "Elite Marketing",
                role: isArabic
                  ? "التسويق والعلامة التجارية"
                  : "Marketing & Branding",
                img: m4,
              },
              {
                name: "Global Trade Co.",
                role: isArabic ? "التجارة الدولية" : "International Trading",
                img: m5,
              },
              {
                name: "SecurePay",
                role: isArabic
                  ? "حلول الدفع الآمن"
                  : "Secure Payment Solutions",
                img: m6,
              },
            ].map((partner, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center bg-gradient-to-b from-[#ffffff] to-[#f5f5ff] rounded-3xl shadow-md p-8 hover:shadow-xl transition"
                whileHover={{ y: -6 }}
              >
                <div className="w-40 h-40 mb-6">
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#1B1664]"
                  />
                </div>
                <h4 className="text-xl font-semibold text-[#1B1664]">
                  {partner.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{partner.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
