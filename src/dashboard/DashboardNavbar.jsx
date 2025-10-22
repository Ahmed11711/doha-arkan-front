// src/dashboard/DashboardNavbar.jsx
import React from "react";

export default function DashboardNavbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h1>
      <button className="bg-[#1B1664] text-white px-4 py-2 rounded-lg hover:bg-[#15104F] transition">
        Logout
      </button>
    </header>
  );
}
