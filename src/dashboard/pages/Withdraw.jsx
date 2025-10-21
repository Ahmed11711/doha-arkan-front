import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
  FaWallet,
  FaPlus,
  FaRegKeyboard,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function WithdrawDashboard() {
  const { t } = useTranslation();
  const [showSteps, setShowSteps] = useState(false);

  const withdrawHistory = [
    { id: 1, date: "2025-10-12", amount: "150 USD", method: "PayPal", status: "Completed" },
    { id: 2, date: "2025-10-19", amount: "300 USD", method: "Crypto Wallet", status: "Pending" },
  ];

  const steps = [
    {
      icon: <FaRegKeyboard />,
      title: t("Enter the Desired Amount"),
      desc: t("Please enter the amount you wish to withdraw in the designated field."),
    },
    {
      icon: <FaCheckCircle />,
      title: t("Confirm the Request"),
      desc: t("Click the 'Withdraw Request' button to confirm the transaction."),
    },
    {
      icon: <FaClock />,
      title: t("Wait for the Transfer"),
      desc: t("Your request will be processed within 24 hours and funds will be transferred to your account."),
    },
  ];

  return (
    <div className="min-h-screen pt-10 px-6 text-gray-900 dark:text-gray-100">
      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1B1664] dark:text-white flex items-center gap-3">
            <FaWallet className="text-[#1B1664]" /> {t("Withdraw")}
          </h1>

          {!showSteps && (
            <button
              onClick={() => setShowSteps(true)}
              className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#2C218E] text-white px-5 py-2 rounded-xl transition"
            >
              <FaPlus /> {t("New Withdraw")}
            </button>
          )}
        </div>

        {/* الحالة الأولى: جدول الهيستوري */}
        {!showSteps && (
          <div>
            <h2 className="text-lg font-semibold mb-4">{t("Withdraw History")}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">{t("Date")}</th>
                    <th className="px-4 py-3 text-left">{t("Amount")}</th>
                    <th className="px-4 py-3 text-left">{t("Method")}</th>
                    <th className="px-4 py-3 text-left">{t("Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">{item.amount}</td>
                      <td className="px-4 py-3">{item.method}</td>
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

        {/* الحالة الثانية: خطوات السحب */}
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
                {t("Complete Your Withdrawal")}
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4">
                <span className="flex-1 text-[#1B1664] dark:text-gray-200 font-semibold">
                  {t("Available Balance")}: $122,080
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <input
                  type="number"
                  placeholder={t("Enter amount")}
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-[#1B1664] transition"
                />
                <input
                  type="text"
                  placeholder={t("Enter address")}
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-[#1B1664] transition"
                />
                <button className="px-8 py-3 bg-[#1B1664] hover:bg-[#2C218E] text-white font-semibold rounded-lg flex items-center gap-2 transition">
                  <FaArrowRight /> {t("Withdraw Request")}
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                🕒 {t("Withdrawal requests are processed within 24 hours.")}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
