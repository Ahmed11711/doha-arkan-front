import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import contactImg from "../assets/images/hero3.png";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <>
      {/* Hero Section */}
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
            Contact Us
          </span>
          <h3 className="text-4xl md:text-6xl font-bold mb-4 font-[Rubik]">
            {t("Find the best crypto trading rates")}
          </h3>
          <p className="text-lg mb-6 font-[Rubik]">
            {t(
              "Discover competitive rates and seamless transactions with Arkan. Buy and sell cryptocurrencies with ease, anywhere, anytime."
            )}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">
          <div className="hidden md:block relative">
            <img
              src={contactImg}
              alt="Office building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1B1664]/40 mix-blend-multiply"></div>
          </div>

          <div className="p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B1664] mb-4">
              Let’s Get In Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Or just reach out manually to{" "}
              <a
                href="mailto:hello@arkan.com"
                className="text-[#1B1664] font-medium hover:underline"
              >
                hello@arkan.com
              </a>
            </p>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
              />

              <textarea
                rows="4"
                placeholder="Message"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B1664] bg-transparent"
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 rounded-xl bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
              >
                Submit Form →
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
