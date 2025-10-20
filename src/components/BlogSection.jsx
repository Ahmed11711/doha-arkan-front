import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import hero from "../assets/images/hero.png";
import { useTranslation } from "react-i18next";

export default function HomeBlogs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const blogs = [
    {
      id: 1,
      title: "How to Start Investing in Crypto",
      content:
        "Learn the basics of cryptocurrency investments, wallet setup, and secure transactions to grow your digital assets.",
      date: "Oct 15, 2025",
      author: "Ahmed Ali",
      authorImg: hero,
      img: hero,
    },
    {
      id: 2,
      title: "Top 5 Wallets for 2025",
      content:
        "Explore the most secure and user-friendly crypto wallets that suit your needs.",
      date: "Oct 10, 2025",
      author: "Sara Mohamed",
      authorImg: hero,
      img: hero,
    },
    {
      id: 3,
      title: "Understanding Blockchain",
      content:
        "A quick guide to understanding how blockchain technology works and its benefits.",
      date: "Oct 5, 2025",
      author: "Omar Youssef",
      authorImg: hero,
      img: hero,
    },
    {
      id: 4,
      title: "Market Trends You Should Watch",
      content:
        "Stay updated with the latest trends shaping the cryptocurrency market this year.",
      date: "Oct 1, 2025",
      author: "Laila Hassan",
      authorImg: hero,
      img: hero,
    },
  ];

  const featured = blogs[0];
  const others = blogs.slice(1);

  return (
    <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10 inline-block">
          {t("Latest Blogs")}
        </h2>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl md:text-8xl font-extrabold text-gray-200 dark:text-gray-700 opacity-20 select-none z-0">
          {t("Latest Blogs")}
        </span>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
          {t(
            "Explore our wide range of services designed to meet your crypto needs."
          )}
        </p>
      </div>
      <motion.div
        className={`max-w-7xl border p-8 rounded mx-auto flex flex-col md:flex-row items-center gap-10 mb-16 ${
          isArabic ? "flex-row-reverse" : ""
        }`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className={`md:w-1/2 ${
            isArabic ? "text-right" : "text-left"
          } space-y-4`}
        >
          <p className="text-sm text-gray-500">{featured.date}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {featured.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {featured.content}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <img
              src={featured.authorImg}
              alt={featured.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {featured.author}
            </span>
          </div>

          <button className="mt-4 px-6 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition flex items-center gap-2">
            {t("Read More")}
            {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src={featured.img}
            alt={featured.title}
            className="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {others.map((blog, i) => (
          <motion.div
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {blog.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                {blog.content}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <img
                  src={blog.authorImg}
                  alt={blog.author}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {blog.author}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={`max-w-7xl border p-8 rounded mx-auto flex flex-col md:flex-row items-center gap-10 mt-16 ${
          isArabic ? "flex-row-reverse" : ""
        }`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className={`md:w-1/2 ${
            isArabic ? "text-right" : "text-left"
          } space-y-4`}
        >
          <p className="text-sm text-gray-500">{featured.date}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {featured.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {featured.content}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <img
              src={featured.authorImg}
              alt={featured.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {featured.author}
            </span>
          </div>

          <button className="mt-4 px-6 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition flex items-center gap-2">
            {t("Read More")}
            {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src={featured.img}
            alt={featured.title}
            className="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>
      </motion.div>
      <div className="text-center mt-10">
        <button className="px-8 py-3 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition flex items-center gap-2 mx-auto">
          {t("View All Blogs")}
          {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
    </section>
  );
}
