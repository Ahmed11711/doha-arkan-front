import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ApiClient from "../services/API";
import { useNavigate } from "react-router-dom";

export default function HomeBlogs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await ApiClient.get("blogs");
        // console.log("✅ Blogs:", res);
        setBlogs(res.data || []);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-20 px-6 text-center text-gray-500">
        {t("No blogs available")}
      </section>
    );
  }

  const featured = blogs[0];
  const lastBlog = blogs.length > 1 ? blogs[blogs.length - 1] : null;
  const middleBlogs = blogs.slice(1, blogs.length - 1);

  const renderFeatured = (blog) => (
    <motion.div
      key={blog.id}
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
        <p className="text-sm text-gray-500">
          {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 ">{blog.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {/* {isArabic ? blog.text_ar : blog.text} */}
          {blog.text}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <img
            src={blog.userImg}
            alt={blog.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">{blog.userName}</span>
        </div>

        <button
          onClick={() => navigate(`/blogs/${blog.id}`, { state: blog })}
          className="mt-4 px-6 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition flex items-center gap-2"
        >
          {t("Read More")}
          {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      <div className="md:w-1/2">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-3xl shadow-lg"
        />
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 px-6 bg-gray-100 transition-colors duration-500">
      <div className="text-center mb-16 relative px-4 md:px-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 relative z-10 inline-block">
          {t("latestBlogs.title")}
        </h2>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-200 opacity-20 select-none z-0">
          {t("latestBlogs.title")}
        </span>
        <p className="text-base sm:text-lg md:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
          {t("latestBlogs.subtitle")}
        </p>
      </div>

      {renderFeatured(featured)}

      {middleBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {middleBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
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
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">
                  {blog.title}
                </h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {/* {isArabic ? blog.text_ar : blog.text} */}
                  {blog.text}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={blog.userImg}
                    alt={blog.userName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{blog.userName}</span>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() =>
                      navigate(`/blogs/${blog.id}`, { state: blog })
                    }
                    className="mt-4 px-6 py-2 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition flex items-center gap-2"
                  >
                    {t("Read More")}
                    {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ Last featured (if more than one blog) */}
      {lastBlog && blogs.length > 1 && renderFeatured(lastBlog, "last")}

      <div className="text-left mt-8 flex justify-center">
        <button
          onClick={() => navigate("/blogs")}
          className="px-8 py-3 rounded-full bg-[#1B1664FC] text-white font-medium hover:bg-[#15104F] transition flex items-center gap-2"
        >
          {t("latestBlogs.button")}
          {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
    </section>
  );
}
