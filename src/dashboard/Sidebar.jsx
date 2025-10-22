import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaUsers,
  FaIdCard,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Deposit",
    icon: <FaArrowDown />,
    path: "/dashboard/deposit",
  },
  {
    name: "Withdraw",
    icon: <FaArrowUp />,
    path: "/dashboard/withdraw",
  },
  {
    name: "Affiliate",
    icon: <FaUsers />,
    path: "/dashboard/affiliate",
  },
  {
    name: "KYC",
    icon: <FaIdCard />,
    path: "/dashboard/kyc",
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-white border-r border-gray-200 z-40 flex flex-col transform transition-all duration-300
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between border-b border-gray-100 px-4 flex-shrink-0">
          <h1 className="text-[#1B1664] font-bold text-xl">
            {isOpen ? "Arkan" : "A"}
          </h1>

          {/* Close button (for mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#1B1664] text-xl lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-[#1B1664] text-white"
                      : "text-[#1B1664] hover:bg-blue-50"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && (
                  <span className="font-medium text-sm">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

      </div>
    </>
  );
}
