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

const Home = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

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
          className={`relative z-10 text-white max-w-xl px-12 ${
            isArabic ? "ml-auto text-right" : "mr-auto text-left"
          }`}
        >
          <p className="font-[Roboto]">
            {t("Market to and from anywhere in the world")}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[Rubik]">
            {t("Find the best crypto trading rates")}
          </h1>
          <p className="text-lg mb-6 font-[Rubik]">
            {t(
              "Discover competitive rates and seamless transactions with Arkan. Buy and sell cryptocurrencies with ease, anywhere, anytime."
            )}
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
                {t("Who We Are")}
              </h2>
              <span className="absolute top-0 left-0 text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-300 opacity-20 select-none z-0">
                {t("Who We Are")}
              </span>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Aliquam nibh quam vivamus
              ultricies semper sed gravida dictumst nunc. Ut ac luctus facilisis
              ipsum mauris volutpat elementum ut. Volutpat nullam tellus egestas
              scelerisque tellus.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              Id pellentesque eget sollicitudin quis morbi arcu. Id etiam sed
              dui tellus purus morbi aenean. Quis non non massa ut amet. Nec id
              sed ullamcorper tincidunt egestas sit. Ac elementum in justo
              feugiat netus suspendisse molestie. Tortor eget mattis aliquet at
              nunc elementum ornare aliquet placerat.
            </p>

            <button
              onClick={() => navigate("/about")}
              className="px-6 py-3 bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold rounded shadow-md transition"
            >
              {t("Learn More")}
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center w-full">
            <div className="orbit-container w-[85%] sm:w-[80%] md:w-[90%] max-w-[550px]">
              <svg
                viewBox="0 0 500 500"
                className="orbit-svg w-full drop-shadow-lg"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="120"
                  className="orbit-path inner"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="190"
                  className="orbit-path outer"
                />

                <text
                  x="250"
                  y="265"
                  textAnchor="middle"
                  className="center-text text-2xl font-bold fill-[#1B1664FC]"
                >
                  arkan
                </text>

                <g className="inner-orbit">
                  {[
                    { x: 250, y: 110 },
                    { x: 340, y: 220 },
                    { x: 250, y: 340 },
                  ].map((pos, idx) => (
                    <foreignObject
                      key={idx}
                      x={pos.x}
                      y={pos.y}
                      width="60"
                      height="60"
                      className="orbit-item"
                    >
                      <img
                        src={hero}
                        alt={idx + 1}
                        className="rounded-full w-full h-full object-cover"
                      />
                    </foreignObject>
                  ))}
                </g>

                <g className="outer-orbit">
                  {[
                    { x: 420, y: 220 },
                    { x: 250, y: 30 },
                    { x: 40, y: 230 },
                  ].map((pos, idx) => (
                    <foreignObject
                      key={idx}
                      x={pos.x}
                      y={pos.y}
                      width="70"
                      height="70"
                      className="orbit-item"
                    >
                      <img
                        src={hero}
                        alt={idx + 4}
                        className="rounded-full w-full h-full object-cover"
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
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative z-10 inline-block">
              {t("Our Services")}
            </h2>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl md:text-8xl font-extrabold text-gray-200 opacity-20 select-none z-0">
              {t("Our Services")}
            </span>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              {t(
                "Explore our wide range of services designed to meet your crypto needs."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
                  {service.title}
                </h3>

                {/* الوصف */}
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* الزر */}
                <button
                  onClick={() => navigate(`/services?tab=${idx}`)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition"
                >
                  {isArabic ? (
                    <FaArrowLeft className="text-sm" />
                  ) : (
                    <FaArrowRight className="text-sm" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackagesCoverflow services={services} />
      <BlogSection />

      <section className="w-full py-20 px-6 bg-[#1B1664FC] transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              YOUR TRADING JOURNEY BEGINS HERE!
            </h2>
            <p className="text-lg text-gray-200 mb-2">
              1000+ 💰📈 our users trade and grow daily
            </p>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
              We’re redefining the world of crypto trading to help you invest
              smarter and trade safer. Our mission is to empower every trader to
              think beyond limits, explore new markets, and build long-term
              financial freedom through innovation and insight.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="px-6 py-3 rounded-full bg-white text-[#1B1664] font-semibold shadow-lg hover:bg-gray-200 transition">
                APP STORE
              </button>
              <button className="px-6 py-3 rounded-full border border-white/60 text-white font-semibold hover:bg-white/10 transition">
                PLAY STORE
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={app}
              alt="Crypto trading illustration"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
