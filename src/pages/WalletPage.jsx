import React from "react";
import {
  FaEyeSlash,
  FaCopy,
  FaDollarSign,
  FaRegCalendarAlt,
  FaShareAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import empty from "../assets/images/empty.png";
import empty2 from "../assets/images/empty2.png";
import wallet from "../assets/images/wallet.png";
import { useNavigate } from "react-router-dom";

export default function WalletPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const balance = 5000;
  const address = "TLmUhwUQuvGmBf";
  const stats = [
    { label: t("wallet.shares"), value: 0 },
    { label: t("wallet.sellInv"), value: 0 },
    { label: t("wallet.rentalUnits"), value: 0 },
  ];
  const buttons = [
    {
      icon: <FaDollarSign />,
      label: t("wallet.deposit"),
      path: "/deposit",
    },
    {
      icon: <FaRegCalendarAlt />,
      label: t("wallet.withdraw"),
      path: "/withdraw",
    },
    {
      icon: <FaShareAlt />,
      label: t("wallet.affiliate"),
      path: "/affiliate",
    },
  ];
  return (
    <div
      dir={t("dir")}
      className="min-h-screen font-sans transition-all duration-300 pt-16 bg-[#f6f7fb] text-gray-800 dark:bg-[#0e0e1a] dark:text-white"
    >
      {/* Header */}
      <div
        className="relative w-full min-h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${wallet})`,
        }}
      >
        <div
          dir={t("dir")}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 text-white flex flex-col justify-between py-8"
        >
          {/* Current Balance */}
          <div
            className={`text-${
              t("dir") === "rtl" ? "right" : "left"
            } mb-8 sm:mb-12`}
          >
            <h3 className="text-sm opacity-80">{t("wallet.currentBalance")}</h3>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-4xl sm:text-5xl font-extrabold">
                ${balance}
              </span>
              <button
                aria-label="toggle-eye"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                <FaEyeSlash />
              </button>
            </div>
            <p className="text-sm text-white/70 mt-1">{t("wallet.balance")}</p>
          </div>

          {/* Stats */}
          <div className="w-full flex justify-center mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/20 transition text-white text-center shadow-lg"
                >
                  <div className="text-xs opacity-80">{s.label}</div>
                  <div className="mt-2 font-bold text-lg sm:text-xl">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div
            className={`w-full sm:w-auto md:max-w-md mx-auto sm:mx-0 text-${
              t("dir") === "rtl" ? "right" : "left"
            }`}
          >
            <div className="bg-white/10 rounded-2xl p-2 px-4 sm:px-8 flex items-center gap-3 backdrop-blur-md flex-wrap">
              <input
                readOnly
                value={address}
                className="bg-transparent outline-none text-sm text-white/90 flex-1 min-w-[150px]"
              />
              <button className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition text-sm">
                <FaCopy />
                <span className="font-medium">{t("wallet.copy")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left actions */}
        <div className="md:col-span-1 space-y-4">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => navigate(btn.path)} // ⬅️ هنا الانتقال للصفحة
              className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl transition-all duration-300
          bg-white hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-violet-100 text-[#1B1664] dark:bg-[#2a2a4a] dark:text-white">
                  {btn.icon}
                </div>
                <div className="font-medium">{btn.label}</div>
              </div>
              <div className="opacity-40 text-lg">›</div>
            </button>
          ))}
        </div>

        {/* Right: history */}
        <div className="md:col-span-2">
          <div className="rounded-3xl p-8 shadow-sm min-h-[300px] bg-white dark:bg-gray-800 transition">
            <h4 className="text-lg font-semibold mb-6 text-[#1B1664] dark:text-white">
              {t("wallet.history")}
            </h4>

            <div className="flex items-center justify-center h-56 text-gray-400">
              <div className="text-center">
                <img
                  src={empty}
                  alt="empty"
                  className="w-40 mx-auto block dark:hidden transition-all duration-300"
                />
                <img
                  src={empty2}
                  alt="empty dark"
                  className="w-40 mx-auto hidden dark:block transition-all duration-300"
                />
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {t("wallet.noTransactions")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
