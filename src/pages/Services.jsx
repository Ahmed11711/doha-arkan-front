import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PricingCard from "../components/PricingCard";
import hero from "../assets/images/hero.png";
import { useTranslation } from "react-i18next";
export default function Services() {
  const services = [
    {
      name: "Crypto Trading",
      plans: [
        {
          plan: "Basic",
          price: 10,
          period: "month",
          featured: false,
          features: [
            { label: "Access to basic trading tools", enabled: true },
            { label: "Community Support", enabled: true },
            { label: "Portfolio Tracking", enabled: false },
            { label: "AI Insights", enabled: false },
          ],
        },
        {
          plan: "Pro",
          price: 25,
          period: "month",
          featured: true,
          features: [
            { label: "Advanced trading analytics", enabled: true },
            { label: "Priority Support", enabled: true },
            { label: "Portfolio Tracking", enabled: true },
            { label: "AI Insights", enabled: false },
          ],
        },
        {
          plan: "Enterprise",
          price: 50,
          period: "month",
          featured: false,
          features: [
            { label: "All Pro features", enabled: true },
            { label: "Dedicated Manager", enabled: true },
            { label: "Custom API Access", enabled: true },
            { label: "AI Insights", enabled: true },
          ],
        },
      ],
    },
    {
      name: "Market Analysis",
      plans: [
        {
          plan: "Starter",
          price: 8,
          period: "month",
          featured: false,
          features: [
            { label: "Daily Market Reports", enabled: true },
            { label: "Basic Trends", enabled: true },
            { label: "Weekly Forecasts", enabled: false },
            { label: "1-on-1 Consultations", enabled: false },
          ],
        },
        {
          plan: "Advanced",
          price: 20,
          period: "month",
          featured: true,
          features: [
            { label: "In-depth Analytics", enabled: true },
            { label: "Weekly Forecasts", enabled: true },
            { label: "Trader Insights", enabled: true },
            { label: "1-on-1 Consultations", enabled: false },
          ],
        },
        {
          plan: "Professional",
          price: 40,
          period: "month",
          featured: false,
          features: [
            { label: "All Advanced features", enabled: true },
            { label: "1-on-1 Consultations", enabled: true },
            { label: "Custom Market Reports", enabled: true },
            { label: "AI-Driven Predictions", enabled: true },
          ],
        },
      ],
    },
    {
      name: "Wallet Security",
      plans: [
        {
          plan: "Essential",
          price: 5,
          period: "month",
          featured: false,
          features: [
            { label: "2FA Authentication", enabled: true },
            { label: "Password Vault", enabled: true },
            { label: "Anti-Phishing Filter", enabled: false },
            { label: "Hardware Key Support", enabled: false },
          ],
        },
        {
          plan: "Advanced",
          price: 15,
          period: "month",
          featured: true,
          features: [
            { label: "All Essential features", enabled: true },
            { label: "Phishing Alerts", enabled: true },
            { label: "Multi-Device Protection", enabled: true },
            { label: "Hardware Key Support", enabled: false },
          ],
        },
        {
          plan: "Ultimate",
          price: 35,
          period: "month",
          featured: false,
          features: [
            { label: "All Advanced features", enabled: true },
            { label: "Hardware Key Support", enabled: true },
            { label: "24/7 Security Monitoring", enabled: true },
            { label: "Custom Protection Rules", enabled: true },
          ],
        },
      ],
    },
  ];
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div
          className={`relative z-10 text-white max-w-xl  ${
            isArabic ? "ms-5 text-right" : "ms-5 text-left"
          }`}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">
            Services
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

      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 min-h-screen">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose your right plan
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Select from best plans tailored to each service. Customize your
            experience with flexibility and performance.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mt-10 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-[#1B1664] text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-10"
        >
          {services[activeTab].plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
