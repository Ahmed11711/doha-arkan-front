import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PricingCard from "../components/PricingCard";
import hero from "../assets/images/hero2.jpg";
import { useTranslation } from "react-i18next";
import ApiClient from "../services/API";
import { useLocation } from "react-router-dom";

export default function Services() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = parseInt(params.get("tab"), 10);

    if (!isNaN(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await ApiClient.get("service"); // ✅ جلب البيانات من API
        console.log("✅ Services:", res.data);

        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else if (Array.isArray(res.data.data)) {
          // أحيانًا السيرفر بيرجع داخل data.data
          setServices(res.data.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div
          className={`relative z-10 text-white max-w-xl ${
            isArabic ? "ms-5 text-right" : "ms-5 text-left"
          }`}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">
            {t("Services")}
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

      {/* ===== Services Section ===== */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 min-h-screen">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Choose your right plan")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t(
              "Select from best plans tailored to each service. Customize your experience with flexibility and performance."
            )}
          </p>

          {/* ===== Tabs ===== */}
          {loading ? (
            <p className="text-gray-500 mt-10">{t("Loading services...")}</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 mt-10">
              {t("No services available now")}
            </p>
          ) : (
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
                  {service.title || service.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===== Plans (Cards) ===== */}
        {!loading && services.length > 0 && services[activeTab]?.plans && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-10"
          >
            {services[activeTab].plans.map((plan, idx) => (
              <PricingCard
                key={idx}
                plan={plan.name}
                price={plan.price}
                period="month"
                featured={plan.featured}
                features={
                  plan.features?.length
                    ? plan.features
                    : [
                        { label: t("Feature 1"), enabled: true },
                        { label: t("Feature 2"), enabled: false },
                      ]
                }
              />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
