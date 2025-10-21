import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaUsers,
  FaIdCard,
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

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100">
        <h1 className="text-[#1B1664] font-bold text-xl">
          {isOpen ? "Arkan" : "A"}
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
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
  );
}
