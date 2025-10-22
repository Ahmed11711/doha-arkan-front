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

export default function Affiliate() {
  const { t } = useTranslation();

  const address = "TLmUhwUQuvGmBf";

  return (
    <div
      dir={t("dir")}
      className="min-h-screen font-sans transition-all duration-300 pt-16 bg-[#f6f7fb] text-gray-800"
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
          className="relative z-10 w-full max-w-6xl text-white flex flex-col justify-between py-8"
        >
          <div
            className={`text-${
              t("dir") === "rtl" ? "right" : "left"
            } mb-8 sm:mb-12`}
          >
            <div className="flex-column items-center gap-3 mt-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white flex items-center gap-3">
                Affiliate
              </h1>
              <p>refer a Freind & Win up to $250</p>
              <span className="badge bg-white text-gray-700 rounded-3xl my-3 p-2">
                How it Work?
              </span>
            </div>
          </div>

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

        <div>
          <img src={empty2} alt="" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          
        </div>

        <div className="md:col-span-2">
          <div className="rounded-3xl p-8 shadow-sm min-h-[300px] bg-white transition">
            <h4 className="text-lg font-semibold mb-6 text-[#1B1664]">
              {t("wallet.history")}
            </h4>

            <div className="flex items-center justify-center h-56 text-gray-400">
              <div className="text-center">
                <img
                  src={empty}
                  alt="empty"
                  className="w-40 mx-auto block transition-all duration-300"
                />
                <div className="mt-4 text-sm text-gray-500 ">
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
