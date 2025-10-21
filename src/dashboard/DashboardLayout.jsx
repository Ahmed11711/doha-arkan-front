import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-white shadow px-6 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1B1664] text-2xl focus:outline-none"
          >
            <FaBars />
          </button>

          <h1
            className="text-lg font-semibold text-[#1B1664] cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Back to Site
          </h1>
        </div>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
