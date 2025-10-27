import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PricingCard from "../components/PricingCard";
import hero from "../assets/images/contact2.jpg";
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
  // 🟢 Scroll to the plans section if URL contains #plans
  useEffect(() => {
    if (location.hash === "#plans") {
      const section = document.getElementById("plans");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300); // تأخير بسيط لحد ما الصفحة تحمل
      }
    }
  }, [location]);

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
        const res = await ApiClient.get("service");
        // console.log("✅ Services:", res.data);

        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else if (Array.isArray(res.data.data)) {
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
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {isArabic ? "خدماتنا" : "Our Services"}
          </span>

          <h3 className="text-4xl md:text-6xl font-bold mb-4 font-[Rubik]">
            {isArabic
              ? "ZAYAM ROCK — نصنع الحرية المالية"
              : "ZAYAM ROCK — Building Financial Freedom"}
          </h3>

          <p className="text-lg mb-6 font-[Rubik] leading-relaxed">
            {isArabic
              ? "فرص استثمارية ذكية مصممة لتناسب أهدافك."
              : "Smart investment opportunities tailored to your goals."}
          </p>
        </div>
      </section>

      <section
        id="plans"
        className="py-20 px-6 bg-gray-50 transition-colors duration-500 min-h-screen"
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("Choose your right plan")}
          </h2>
          <p className="text-gray-600">
            {t(
              "Select from best plans tailored to each service. Customize your experience with flexibility and performance."
            )}
          </p>

          {loading ? (
            <p className="text-gray-500 mt-10">{t("Loading services...")}</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500 mt-10">
              {t("No services available now")}
            </p>
          ) : (
            <>
              {/* الأزرار */}
              <div className="flex flex-wrap justify-center mt-10 gap-4">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeTab === index
                        ? "bg-[#1B1664] text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {isArabic ? service.title : service.title_en}
                  </button>
                ))}
              </div>

              {/* الوصف في مكان ثابت */}
              {services[activeTab] && (
                <div className="mt-8 text-center max-w-2xl mx-auto px-4">
                  <p className="text-gray-700 text-lg leading-relaxed transition-all duration-300">
                    {isArabic
                      ? services[activeTab].about_desc ||
                        t("No description available")
                      : services[activeTab].about_desc_en ||
                        t("No description available")}
                  </p>
                </div>
              )}
            </>
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
                id={plan.id}
                plan={isArabic ? plan.name : plan.name_en}
                price={parseFloat(plan.amount)}
                period={`${plan.duration_months} ${t("months")}`}
                featured={plan.featured}
                features={[
                  {
                    label: `${t("Profit Rate")}: ${plan.profit_rate}%`,
                    enabled: true,
                  },
                  {
                    label: `${t("Duration")}: ${plan.duration_months} ${t(
                      "months"
                    )}`,
                    enabled: true,
                  },
                  {
                    label: `${t("Capital Return")}: ${
                      plan.capital_return ? t("Yes") : t("No")
                    }`,
                    enabled: plan.capital_return === 1,
                  },
                ]}
                tabIndex={activeTab}
                minimum_count={plan.minimum_count}
              />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
