import React from "react";
import { useLocation, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import hero from "../assets/images/hero.png";
import { useTranslation } from "react-i18next";

export default function BlogDetails() {
  const { state: blog } = useLocation();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-300">
        Blog not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <section
        className="relative w-full mb-10 h-[95vh] bg-cover bg-center flex items-end"
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
            Blog Details
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

      {/* Blog Main Image */}
      <div className="relative max-w-5xl mx-auto mt-20 mb-12 px-4">
        <img
          src={blog.image || "https://via.placeholder.com/1200x600"}
          alt={blog.title}
          className="w-full rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 object-cover"
        />
      </div>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {blog.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date(blog.date).toDateString()}
          </p>
        </div>
        {/* Author Info */}
        <div className="flex items-center  gap-4 mb-12">
          <img
            src={blog.authorImg}
            alt={blog.author}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#1B1664]"
          />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {blog.author}
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t("Content Creator")}
            </p>
          </div>
        </div>
        <motion.div
          className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>{blog.content}</p>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B1664] text-white hover:bg-[#15104F] transition"
          >
            <FaArrowLeft /> {t("Back to Blogs")}
          </Link>
        </div>
      </section>
    </div>
  );
}
