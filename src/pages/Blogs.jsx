import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import heroImg from "../assets/images/hero2.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Blogs() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const blogs = [
    {
      id: 1,
      title: "Mastering Crypto Trading in 2025",
      category: "Trading",
      date: "2025-10-10",
      author: "Sarah Ali",
      authorImg: "https://i.pravatar.cc/100?img=1",
      image: heroImg,
      content:
        "Learn how to navigate the new crypto markets with our expert tips and insights, Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quidem. Provident, doloremque, dicta, eveniet magni nesciunt repellendus officiis ab cumque hic quaerat. Voluptatum, doloribus. Quisquam, quidem. Velit, dicta repellat!",
    },
    {
      id: 2,
      title: "The Rise of Bitcoin ETFs",
      category: "News",
      date: "2025-09-20",
      author: "Ahmed Hassan",
      authorImg: "https://i.pravatar.cc/100?img=5",
      image: heroImg,
      content:
        "Bitcoin ETFs are gaining traction globally — here’s what you need to know, , Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quidem. Provident, doloremque, dicta, eveniet magni nesciunt repellendus officiis ab cumque hic quaerat. Voluptatum, doloribus. Quisquam, quidem. Velit, dicta repellat!",
    },
    {
      id: 3,
      title: "Top 5 Altcoins to Watch This Year",
      category: "Analysis",
      date: "2025-08-05",
      author: "Mona Ibrahim",
      authorImg: "https://i.pravatar.cc/100?img=6",
      image: heroImg,
      content:
        "From Solana to Chainlink, explore the top-performing altcoins of the year, , Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quidem. Provident, doloremque, dicta, eveniet magni nesciunt repellendus officiis ab cumque hic quaerat. Voluptatum, doloribus. Quisquam, quidem. Velit, dicta repellat!",
    },
    {
      id: 4,
      title: "Mastering Crypto Trading in 2025",
      category: "Trading",
      date: "2025-10-10",
      author: "Sarah Ali",
      authorImg: "https://i.pravatar.cc/100?img=1",
      image: heroImg,
      content:
        "Learn how to navigate the new crypto markets with our expert tips and insights, , Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quidem. Provident, doloremque, dicta, eveniet magni nesciunt repellendus officiis ab cumque hic quaerat. Voluptatum, doloribus. Quisquam, quidem. Velit, dicta repellat!",
    },
    {
      id: 5,
      title: "The Rise of Bitcoin ETFs",
      category: "News",
      date: "2025-09-20",
      author: "Ahmed Hassan",
      authorImg: "https://i.pravatar.cc/100?img=5",
      image: heroImg,
      content:
        "Bitcoin ETFs are gaining traction globally — here’s what you need to know, , Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quidem. Provident, doloremque, dicta, eveniet magni nesciunt repellendus officiis ab cumque hic quaerat. Voluptatum, doloribus. Quisquam, quidem. Velit, dicta repellat!",
    },
    {
      id: 6,
      title: "Top 5 Altcoins to Watch This Year",
      category: "Analysis",
      date: "2025-08-05",
      author: "Mona Ibrahim",
      authorImg: "https://i.pravatar.cc/100?img=6",
      image: heroImg,
      content:
        "From Solana to Chainlink, explore the top-performing altcoins of the year, , Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quidem. Provident, doloremque, dicta, eveniet magni nesciunt repellendus officiis ab cumque hic quaerat. Voluptatum, doloribus. Quisquam, quidem. Velit, dicta repellat!",
    },
  ];

  const filteredBlogs = blogs
    .filter((b) => activeTab === "All" || b.category === activeTab)
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
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
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">
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
          {["All", "Trading", "News", "Analysis"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-[#1B1664] text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          Sort by:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none border border-gray-300 dark:border-gray-700"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition cursor-pointer"
            onClick={() => navigate(`/blogs/${blog.id}`, { state: blog })} // ← هنا السحر 😍
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {new Date(blog.date).toDateString()}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {blog.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                {blog.content}
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={blog.authorImg}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-gray-200 text-sm">
                  {blog.author}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-2 mt-16 mb-12">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-[#1B1664] hover:text-white transition"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
