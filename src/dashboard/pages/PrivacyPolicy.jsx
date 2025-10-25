import React from "react";
import { FaLock, FaExternalLinkAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  const links = [
    {
      title: "Introduction",
      url: "https://drive.google.com/file/d/EXAMPLE_1/view",
    },
    {
      title: "Data We Collect",
      url: "https://drive.google.com/file/d/EXAMPLE_2/view",
    },
    {
      title: "How We Use Your Data",
      url: "https://drive.google.com/file/d/EXAMPLE_3/view",
    },
    {
      title: "How We Share Information",
      url: "https://drive.google.com/file/d/EXAMPLE_4/view",
    },
    {
      title: "Your Choices & Obligations",
      url: "https://drive.google.com/file/d/EXAMPLE_5/view",
    },
    {
      title: "Other Important Information",
      url: "https://drive.google.com/file/d/EXAMPLE_6/view",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300">
      <div className="w-full mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1B1664] flex items-center gap-2 sm:gap-3">
            <FaLock className="text-[#1B1664]" />
            Privacy Policy
          </h1>
        </div>

        {/* Links List */}
        <ul className="space-y-4">
          {links.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b border-gray-200 pb-3 hover:bg-gray-50 transition rounded-xl px-2"
            >
              <span className="font-medium text-[#1B1664]">
                {item.title}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View <FaExternalLinkAlt className="text-xs" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
