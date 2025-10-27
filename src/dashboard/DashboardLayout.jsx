import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import EcommerceMetrics from "../components/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../components/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../components/components/ecommerce/StatisticsChart";
import MonthlyTarget from "../components/components/ecommerce/MonthlyTarget";
import RecentOrders from "../components/components/ecommerce/RecentOrders";
import DemographicCard from "../components/components/ecommerce/DemographicCard";
import PageMeta from "../components/components/common/PageMeta";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen pt-24 overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto p-6 transition-all duration-300
          ${
            isOpen
              ? isArabic
                ? "lg:mr-64"
                : "lg:ml-64"
              : isArabic
              ? "lg:mr-20"
              : "lg:ml-20"
          }`}
      >
        {isDashboardHome ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <PageMeta
              title="Zayamrock Dashboard"
              description="This is Zayamrock Dashboard"
            />

            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-6 xl:col-span-7">
                <EcommerceMetrics />
                <MonthlySalesChart />
              </div>

              <div className="col-span-12 xl:col-span-5">
                <MonthlyTarget />
              </div>

              <div className="col-span-12">
                <StatisticsChart />
              </div>

              <div className="col-span-12 xl:col-span-5">
                <DemographicCard />
              </div>

              <div className="col-span-12 xl:col-span-7">
                <RecentOrders />
              </div>
            </div>
          </motion.div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
