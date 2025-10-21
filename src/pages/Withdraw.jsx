import React from "react";
import {
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaRegKeyboard,
  FaArrowRight,
  FaWallet,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Withdraw() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-16 text-gray-900 dark:text-gray-100 py-12 px-6">
      <div className="max-w-9xl mx-auto rounded-2xl shadow-xl p-9 sm:p-12 bg-gradient-to-r from-[#838288] to-[#1B1664]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white dark:text-white flex items-center gap-3">
          Withdraw Funds Request
        </h1>
      </div>

      <div className="max-w-9xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-[#1B1664] dark:text-white flex items-center gap-3">
          <FaMoneyBillWave className="text-green-600" />
          {t("Withdrawal Steps")}
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div className="flex items-start gap-3">
            <FaRegKeyboard className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Enter the Desired Amount")}:</strong>
              <p className="mx-4">
                {t(
                  "Please enter the amount you wish to withdraw in the designated field."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Confirm the Request")}:</strong>
              <p className="mx-4">
                {t(
                  "Click the 'Withdraw Request' button to confirm the transaction."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaClock className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Wait for the Transfer")}:</strong>
              <p className="mx-4">
                {t(
                  "Your request will be processed within 24 hours, and the funds will be transferred to your account."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-inner flex justify-start">
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              {t("Action Area")}:
            </h3>

            <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-600 mb-6">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <FaWallet className="text-2xl text-[#1B1664] dark:text-white" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("Available Balance")}
                  </p>
                  <p className="text-xl font-bold">$122,080</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="number"
                placeholder={t("Enter amount")}
                className="w-full sm:flex-1 px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-[#1B1664] transition"
              />
              <button className="px-8 py-3 bg-[#1B1664] hover:bg-[#372E8B] text-white font-semibold rounded-lg flex items-center gap-2 transition">
                <FaArrowRight /> {t("Withdraw Request")}
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              🕒 {t("Withdrawal requests are processed within 24 hours.")}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
