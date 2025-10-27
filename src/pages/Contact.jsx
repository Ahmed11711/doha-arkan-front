import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import contactImg from "../assets/images/hero3.png";
import contact from "../assets/images/contact.jpg";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <>
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        <div
          className={`relative z-10 text-white max-w-xl ${
            isArabic ? "ms-5 text-right" : "ms-5 text-left"
          }`}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </span>

          <h3 className="text-4xl md:text-6xl font-bold mb-4 font-[Rubik]">
            {isArabic
              ? "نحن هنا لمساعدتك في كل خطوة"
              : "We’re Here to Help You at Every Step"}
          </h3>

          <p className="text-lg mb-6 font-[Rubik] leading-relaxed">
            {isArabic
              ? "تواصل مع فريق ZAYAM ROCK لأي استفسار أو دعم — يسعدنا أن نسمع منك دائمًا."
              : "Reach out to the ZAYAM ROCK team for any inquiries or support — we’re always happy to hear from you."}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">
          <div className="hidden md:block relative">
            <img
              src={contact}
              alt="Office building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1B1664]/40 mix-blend-multiply"></div>
          </div>

          <div className="p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B1664] mb-4">
              {t("Let’s Get In Touch", "هيا نتواصل")}
            </h2>
            <p className="text-gray-600 mb-8">
              {t("Or just reach out manually to", "أو تواصل معنا مباشرة على")}{" "}
              <a
                href="mailto:info@zayamrock.com"
                className="text-[#1B1664] font-medium hover:underline"
              >
                info@zayamrock.com
              </a>
            </p>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder={t("First Name", "الاسم الأول")}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
                />
                <input
                  type="text"
                  placeholder={t("Last Name", "اسم العائلة")}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
                />
              </div>

              <input
                type="email"
                placeholder={t("Email Address", "البريد الإلكتروني")}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
              />

              <input
                type="tel"
                placeholder={t("Phone Number", "رقم الهاتف")}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
              />

              <textarea
                rows="4"
                placeholder={t("Message", "الرسالة")}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 rounded-xl bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
              >
                {t("Submit Form →", "إرسال النموذج →")}
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
