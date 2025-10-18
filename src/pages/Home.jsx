import React from "react";
import { useTranslation } from "react-i18next";
import hero from "../assets/images/hero3.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./Home.css";
import PackagesCoverflow from "../components/PackagesCoverflow";
import BlogSection from "../components/BlogSection.jsx";
const Home = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const services = [
    {
      img: hero,
      title: t("Buy Crypto"),
      description: t(
        "Purchase cryptocurrencies easily with competitive rates and secure transactions."
      ),
    },
    {
      img: hero,
      title: t("Sell Crypto"),
      description: t(
        "Sell your cryptocurrencies quickly and securely with our user-friendly platform."
      ),
    },
    {
      img: hero,
      title: t("Exchange Crypto"),
      description: t(
        "Easily exchange between different cryptocurrencies with low fees and fast processing."
      ),
    },
  ];

  return (
    <>
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${hero})`,
        }}
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

          <div
            className={`flex bg-white rounded overflow-hidden shadow-lg max-w-md ${
              isArabic ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <input
              type="text"
              placeholder={isArabic ? "ابحث هنا..." : "Search for something..."}
              className={`flex-1 px-4 py-4 text-gray-800 outline-none ${
                isArabic ? "text-right" : "text-left"
              }`}
            />
            <button className="bg-gray-600 hover:bg-gray-700 px-6 text-white rounded font-semibold transition">
              {isArabic ? "بحث" : "Search"}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div
          className={`max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 ${
            isArabic ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* النصوص */}
          <div
            className={`flex-1 ${
              isArabic ? "text-right" : "text-left"
            } relative w-full`}
          >
            <div className="relative mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10">
                {t("Who We Are")}
              </h2>
              <span className="absolute top-0 left-0 text-7xl md:text-8xl font-extrabold text-gray-300 dark:text-gray-700 opacity-20 select-none z-0">
                {t("Who We Are")}
              </span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Aliquam nibh quam vivamus
              ultricies semper sed gravida dictumst nunc. Ut ac luctus facilisis
              ipsum mauris volutpat elementum ut. Volutpat nullam tellus egestas
              scelerisque tellus.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Id pellentesque eget sollicitudin quis morbi arcu. Id etiam sed
              dui tellus purus morbi aenean. Quis non non massa ut amet. Nec id
              sed ullamcorper tincidunt egestas sit. Ac elementum in justo
              feugiat netus suspendisse molestie. Tortor eget mattis aliquet at
              nunc elementum ornare aliquet placerat.
            </p>

            <button className="px-6 py-3 bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold rounded shadow-md transition">
              {t("Learn More")}
            </button>
          </div>

          {/* الأوربت SVG */}
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="orbit-container w-[90%] max-w-[400px] sm:max-w-[450px] md:max-w-[500px]">
              <svg viewBox="0 0 500 500" className="orbit-svg w-full h-auto">
                {/* الدوائر (المسارات) */}
                <circle
                  cx="250"
                  cy="250"
                  r="110"
                  className="orbit-path inner"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="180"
                  className="orbit-path outer"
                />

                {/* النص في المنتصف */}
                <text
                  x="250"
                  y="260"
                  textAnchor="middle"
                  className="center-text"
                >
                  arkan
                </text>

                {/* العناصر على الدائرة الداخلية */}
                <g className="inner-orbit">
                  <foreignObject
                    x="250"
                    y="120"
                    width="50"
                    height="50"
                    className="orbit-item"
                  >
                    <img src={hero} alt="1" />
                  </foreignObject>
                  <foreignObject
                    x="330"
                    y="220"
                    width="50"
                    height="50"
                    className="orbit-item"
                  >
                    <img src={hero} alt="2" />
                  </foreignObject>
                  <foreignObject
                    x="250"
                    y="330"
                    width="50"
                    height="50"
                    className="orbit-item"
                  >
                    <img src={hero} alt="3" />
                  </foreignObject>
                </g>

                {/* العناصر على الدائرة الخارجية */}
                <g className="outer-orbit">
                  <foreignObject
                    x="400"
                    y="220"
                    width="50"
                    height="50"
                    className="orbit-item"
                  >
                    <img src={hero} alt="4" />
                  </foreignObject>
                  <foreignObject
                    x="250"
                    y="50"
                    width="50"
                    height="50"
                    className="orbit-item"
                  >
                    <img src={hero} alt="5" />
                  </foreignObject>
                  <foreignObject
                    x="50"
                    y="240"
                    width="50"
                    height="50"
                    className="orbit-item"
                  >
                    <img src={hero} alt="6" />
                  </foreignObject>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10 inline-block">
              {t("Our Services")}
            </h2>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl md:text-8xl font-extrabold text-gray-200 dark:text-gray-700 opacity-20 select-none z-0">
              {t("Our Services")}
            </span>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              {t(
                "Explore our wide range of services designed to meet your crypto needs."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <button className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition">
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

      <PackagesCoverflow />

      <BlogSection />

      <section className="w-full py-20 px-6 bg-[#1B1664FC] dark:bg-[#1B1664FC] transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* النص */}
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

            {/* الأزرار */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="px-6 py-3 rounded-full bg-white text-[#1B1664] font-semibold shadow-lg hover:bg-gray-200 transition">
                APP STORE
              </button>
              <button className="px-6 py-3 rounded-full border border-white/60 text-white font-semibold hover:bg-white/10 transition">
                PLAY STORE
              </button>
            </div>
          </div>

          {/* الصورة */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={hero}
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
