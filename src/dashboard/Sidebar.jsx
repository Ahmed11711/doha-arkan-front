import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaUsers,
  FaIdCard,
  FaLock,
  FaBars,
  FaUserCog,
  FaTachometerAlt 
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Deposit", icon: <FaArrowDown />, path: "/dashboard/deposit" },
  { name: "Withdraw", icon: <FaArrowUp />, path: "/dashboard/withdraw" },
  { name: "Affiliate", icon: <FaUsers />, path: "/dashboard/affiliate" },
  { name: "KYC", icon: <FaIdCard />, path: "/dashboard/kyc" },
  {
    name: "My Portfolio",
    icon: <FaUserCog />,
    path: "/dashboard/my-portfolio",
  },
  {
    name: "Privacy policy",
    icon: <FaLock />,
    path: "/dashboard/privacy-policy",
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed lg:fixed top-24 left-0 h-screen rounded
    bg-gradient-to-b from-[#1B1664] to-[#322FA4] text-white z-40 
    flex flex-col transform transition-all duration-300 ease-in-out
    ${
      isOpen
        ? "translate-x-0 w-64"
        : "-translate-x-full lg:translate-x-0 lg:w-20"
    }
    shadow-xl`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 flex items-center justify-center border-b border-white/10 px-4 cursor-pointer select-none hover:bg-white/10 transition"
        >
          <div className="text-3xl font-extrabold tracking-wide bg-white/20 px-5 py-1 rounded-full text-white shadow-inner flex items-center gap-2">
            <FaBars className="text-lg" />
            {isOpen && <span className="text-base font-bold">ARKAN</span>}
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-white text-[#1B1664] font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 bg-[#1B1664] text-white p-3 rounded-full shadow-lg hover:bg-[#322FA4] transition z-50"
        >
          <FaBars size={20} />
        </button>
      )}
    </>
  );
}
