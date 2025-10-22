import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import heroImg from "../assets/images/hero2.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ApiClient from "../services/API";

export default function Blogs() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, servicesRes] = await Promise.all([
          ApiClient.get("blogs-all"),
          ApiClient.get("service"),
        ]);
        if (blogsRes.data) setBlogs(blogsRes.data);
        if (servicesRes.data) setServices(servicesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const filteredBlogs = blogs
    .filter((b) => activeTab === "All" || b.service_id === activeTab)
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-500">
      {/* Hero Section */}
      <section
        className="relative w-full mb-10 h-[95vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div
          className={`relative z-10 text-white max-w-xl  ${
            isArabic ? "ms-5 text-right" : "ms-5 text-left"
          }`}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full ">
            Blogs
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

      {/* Filters & Sort */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {/* All Tab */}
          <button
            onClick={() => setActiveTab("All")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "All"
                ? "bg-[#1B1664] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t("All")}
          </button>

          {/* Dynamic Service Tabs */}
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === service.id
                  ? "bg-[#1B1664] text-white shadow-lg"
                  : "bg-gray-200  text-gray-700  hover:bg-gray-300"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          Sort by:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none border border-gray-300"
          >
            <option value="newest">{t("Newest First")}</option>
            <option value="oldest">{t("Oldest First")}</option>
          </select>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 transition cursor-pointer"
              onClick={() => navigate(`/blogs/${blog.id}`, { state: blog })}
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(blog.created_at).toDateString()}
                </p>
                <h3 className="text-xl font-semibold text-gray-900  mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {blog.text}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={blog.userImg}
                    alt={blog.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-700 text-sm">
                    {blog.userName}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3 py-10">
            {t("No blogs found for this category.")}
          </p>
        )}
      </div>
    </div>
  );
}
