import React, { useState } from "react";
import {
  FaCopy,
  FaCheckCircle,
  FaLink,
  FaWallet,
  FaArrowRight,
  FaHome,
  FaClipboardCheck,
  FaPlus,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function DepositDashboard() {
  const { t } = useTranslation();
  const [showSteps, setShowSteps] = useState(false);

  // بيانات تجريبية للهيستوري
  const depositHistory = [
    { id: 1, date: "2025-10-18", amount: "100 USD", status: "Completed" },
    { id: 2, date: "2025-10-20", amount: "250 USD", status: "Pending" },
  ];

  const steps = [
    {
      icon: <FaLink />,
      title: t("Copy the Payment Link"),
      desc: t("Click the 'Copy Link' button or manually copy the link displayed below."),
    },
    {
      icon: <FaArrowRight />,
      title: t("Go to the Payment Platform"),
      desc: t("Open your preferred platform (e.g. Binance) and complete the payment."),
    },
    {
      icon: <FaClipboardCheck />,
      title: t("Complete the Payment"),
      desc: t("Follow the instructions on the platform to finish the transaction."),
    },
    {
      icon: <FaHome />,
      title: t("Return to Our Website"),
      desc: t("After finishing the payment, come back to this page."),
    },
    {
      icon: <FaCheckCircle />,
      title: t("Confirm the Payment"),
      desc: t("Click the 'Payment Completed' button below."),
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("TLUmhJvQxGmNeURLu39Pw9LD6REu5A");
  };

  return (
    <div className="min-h-screen pt-10 px-6 text-gray-900 dark:text-gray-100">
      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1B1664] dark:text-white flex items-center gap-3">
            <FaWallet className="text-[#1B1664]" /> {t("Deposit")}
          </h1>
          {!showSteps && (
            <button
              onClick={() => setShowSteps(true)}
              className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#2C218E] text-white px-5 py-2 rounded-xl transition"
            >
              <FaPlus /> {t("New Deposit")}
            </button>
          )}
        </div>

        {/* الحالة الأولى: جدول الهيستوري */}
        {!showSteps && (
          <div>
            <h2 className="text-lg font-semibold mb-4">{t("Deposit History")}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">{t("Date")}</th>
                    <th className="px-4 py-3 text-left">{t("Amount")}</th>
                    <th className="px-4 py-3 text-left">{t("Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {depositHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">{item.amount}</td>
                      <td
                        className={`px-4 py-3 font-medium ${
                          item.status === "Completed"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }`}
                      >
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* الحالة الثانية: خطوات الإيداع */}
        {showSteps && (
          <div>
            <button
              onClick={() => setShowSteps(false)}
              className="mb-8 text-[#1B1664] dark:text-white hover:underline"
            >
              ← {t("Back to History")}
            </button>

            <div className="grid gap-6 sm:grid-cols-2 mb-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-[#1B1664] dark:text-white text-2xl mt-1">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1B1664] dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl p-6 md:p-8 shadow-inner">
              <h3 className="text-lg font-semibold mb-6 text-[#1B1664] dark:text-white flex items-center gap-2">
                <FaCheckCircle className="text-[#1B1664] dark:text-white" />
                {t("Complete Your Action")}
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4">
                <span className="flex-1 truncate font-semibold text-[#1B1664] dark:text-gray-200">
                  TLUmhJvQxGmNeURLu39Pw9LD6REu5A
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#2C218E] text-white px-5 py-2.5 rounded-xl transition"
                >
                  <FaCopy /> {t("Copy Link")}
                </button>
              </div>

              <button className="mt-8 w-full sm:w-auto px-8 py-3 bg-[#1B1664] hover:bg-[#2C218E] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition">
                <FaCheckCircle /> {t("Payment Completed")}
              </button>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                🕒{" "}
                {t(
                  "After clicking 'Payment Completed', your transaction will be verified shortly."
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
