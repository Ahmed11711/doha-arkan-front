import React from "react";
import { useTranslation } from "react-i18next";
import hero from "../assets/images/hero3.png";
import app from "../assets/images/app.jpg";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./Home.css";
import PackagesCoverflow from "../components/PackagesCoverflow";
import BlogSection from "../components/BlogSection";
import { useEffect, useState } from "react";
import ApiClient from "../services/API";
import { useNavigate } from "react-router-dom";
import m1 from "../assets/images/m1.webp";
import m2 from "../assets/images/m2.jpg";
import m3 from "../assets/images/m3.jpg";
import m4 from "../assets/images/m4.jpg";
import m5 from "../assets/images/m5.jpg";
import m6 from "../assets/images/m6.webp";
const Home = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const points = t("hero.points", { returnObjects: true });
  const handleStart = () => {
    navigate("/services");
  };

  // 🔹 زرار CTA How -> ينزل للسيكشن
  const handleHow = () => {
    const section = document.getElementById("howItWorks");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await ApiClient.get("service");
        // console.log("✅ Services:", res);
        setServices(res.data || res);
      } catch (error) {
        console.error("❌ Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div
          className={`relative z-10 text-white max-w-4xl px-6 md:px-12 ${
            isArabic ? "ml-auto text-right" : "mr-auto text-left"
          }`}
        >
          <p className="font-[Roboto] text-base md:text-lg mb-1">
            {t("hero.subtitle")}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 font-[Rubik] leading-snug">
            {t("hero.title")}
          </h1>
          <ul className="mb-4 space-y-1 md:space-y-2 text-sm md:text-base">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {/* <span className="text-green-400">✅</span> */}
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <button
              onClick={handleStart}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm md:text-base w-full sm:w-auto transition-all"
            >
              {t("hero.cta_start")}
            </button>
            <button
              onClick={handleHow}
              className="bg-white text-blue-600 hover:text-blue-700 py-2 px-4 rounded text-sm md:text-base w-full sm:w-auto transition-all"
            >
              {t("hero.cta_how")}
            </button>
          </div>
          <p className="text-xs md:text-sm opacity-90">
            {t("hero.trust_line")}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100 transition-colors duration-500">
        <div
          className={`max-w-7xl mx-auto flex flex-col ${
            isArabic ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-12`}
        >
          <div
            className={`flex-1 ${isArabic ? "text-right" : "text-left"} w-full`}
          >
            <div className="relative mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 relative z-10">
                {t("whoWeAre.whoWeAre")}
              </h2>
              <span className="absolute top-0 left-0 text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-300 opacity-20 select-none z-0">
                {t("whoWeAre.whoWeAre")}
              </span>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              {t("whoWeAre.title")}
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              {t("whoWeAre.description")}
            </p>

            <button
              onClick={() => navigate("/about")}
              className="px-6 py-3 bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold rounded shadow-md transition"
            >
              {t("whoWeAre.button")}
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center w-full py-10">
            <div className="orbit-container w-[85%] sm:w-[80%] md:w-[90%] max-w-[550px] relative">
              <svg
                viewBox="0 0 500 500"
                className="orbit-svg w-full drop-shadow-lg"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="130"
                  className="orbit-path inner"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="200"
                  className="orbit-path outer"
                />

                <text
                  x="250"
                  y="265"
                  textAnchor="middle"
                  className="center-text text-2xl font-bold fill-[#1B1664FC]"
                >
                  Zayamrock
                </text>

                {/* INNER ORBIT */}
                <g className="inner-orbit animate-spin-slow">
                  {[
                    { x: 210, y: 120, img: m1 },
                    { x: 370, y: 180, img: m2 },
                    { x: 250, y: 370, img: m3 },
                  ].map((pos, idx) => (
                    <foreignObject
                      key={idx}
                      x={pos.x - 40}
                      y={pos.y - 40}
                      width="80"
                      height="80"
                      className="orbit-item"
                    >
                      <img
                        src={pos.img}
                        alt={`inner-${idx + 1}`}
                        className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                      />
                    </foreignObject>
                  ))}
                </g>

                {/* OUTER ORBIT */}
                <g className="outer-orbit animate-spin-reverse">
                  {[
                    { x: 440, y: 220, img: m4 },
                    { x: 250, y: 40, img: m5 },
                    { x: 40, y: 230, img: m6 },
                  ].map((pos, idx) => (
                    <foreignObject
                      key={idx}
                      x={pos.x - 50}
                      y={pos.y - 50}
                      width="100"
                      height="100"
                      className="orbit-item"
                    >
                      <img
                        src={pos.img}
                        alt={`outer-${idx + 1}`}
                        className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                      />
                    </foreignObject>
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative px-4 md:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 relative z-10 inline-block">
              {t("ourServices.title")}
            </h2>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-200 opacity-20 select-none z-0">
              {t("ourServices.title")}
            </span>
            <p className="text-base sm:text-lg md:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
              {t("ourServices.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md bg-white/70 border-4 border-gray-300/60 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* الصورة */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#1B1664FC] shadow-md overflow-hidden bg-gray-100">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* العنوان */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {isArabic ? service.title : service.title_en}
                </h3>

                {/* الوصف */}
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  {isArabic ? service.desc : service.desc_en}
                </p>

                {/* الزر */}
                <button
                  onClick={() => navigate(`/services?tab=${idx}`)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition"
                >
                  {isArabic ? (
                    <>
                      <span>قراءة المزيد</span>
                      <FaArrowLeft className="text-sm" />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackagesCoverflow services={services} />
      <BlogSection />

      <section
        id="howItWorks"
        className="w-full py-20 px-6 bg-[#1B1664FC] text-white transition-colors duration-500"
      >
        <div
          className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 ${
            isArabic ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* النصوص */}
          <div
            className={`flex-1 text-center md:text-left ${
              isArabic ? "md:text-right md:pr-8" : ""
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              {isArabic ? "كيف نعمل؟" : "How It Works"}
            </h2>

            <p className="text-base sm:text-lg text-gray-200 mb-8">
              {isArabic
                ? "نُبسّط الاستثمار ليكون مناسبًا للجميع — فقط 3 خطوات:"
                : "We make investing simple and effective — just follow 3 steps:"}
            </p>

            <ol className="space-y-4 text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed">
              <li>
                {isArabic
                  ? "أنشئ حسابك — سجّل خلال دقائق مع توثيق آمن لهويتك."
                  : "Create Your Account — Sign up in minutes and verify your identity securely."}
              </li>
              <li>
                {isArabic
                  ? "اختر خيارك الاستثماري — اختر الباقة أو شراء أسهما بما يناسب أهدافك المالية."
                  : "Choose Your Investment Option — Pick the package or shares that match your goals."}
              </li>
              <li>
                {isArabic
                  ? "دع الأرباح تعمل لأجلك — فريقنا يدير استثمارك وأنت تتابع النتائج شهريًا."
                  : "Let the Profits Work for You — Our team manages everything while you track results monthly."}
              </li>
            </ol>

            <p className="text-gray-300 mt-6 text-sm sm:text-base">
              {isArabic
                ? " أداء حقيقي. نمو مستمر. بدون أي تعقيد."
                : " Real performance. Real growth. Zero hassle."}
            </p>

            <div className="mt-10">
              <button
                onClick={() => navigate("/services")}
                className="px-6 py-3 rounded-full bg-white text-[#1B1664] font-semibold shadow-lg hover:bg-gray-200 transition"
              >
                {isArabic ? "ابدأ الاستثمار الآن" : "Start Investing Now"}
              </button>
            </div>
          </div>

          {/* الصورة */}
          <div
            className={`flex-1 flex justify-center ${
              isArabic ? "md:justify-start" : "md:justify-end"
            }`}
          >
            <img
              src={app}
              alt={isArabic ? "كيف نعمل" : "How It Works"}
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
