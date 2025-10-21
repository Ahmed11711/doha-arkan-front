import React from "react";
import {
  FaCopy,
  FaCheckCircle,
  FaLink,
  FaWallet,
  FaArrowRight,
  FaHome,
  FaClipboardCheck,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Deposit() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 text-gray-900 dark:text-gray-100 py-12 px-6">
      <div className="max-w-9xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-[#1B1664] dark:text-white flex items-center gap-3">
          <FaWallet className="text-[#1B1664] dark:text-white" />
          {t("Deposit Steps")}
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div className="flex items-start gap-3">
            <FaLink className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Copy the Payment Link")}:</strong>
              <p className="mx-4">
                {t(
                  "Click the 'Copy Link' button or manually copy the link displayed below."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaArrowRight className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Go to the Payment Platform")}:</strong>
              <p className="mx-4">
                {t(
                  "Open your preferred platform (e.g. Binance) and complete the payment."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaClipboardCheck className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Complete the Payment")}:</strong>
              <p className="mx-4">
                {t(
                  "Follow the instructions on the platform to finish the transaction."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaHome className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Return to Our Website")}:</strong>
              <p className="mx-4">
                {t("After finishing the payment, come back to this page.")}.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-[#1B1664] dark:text-white text-xl mt-1" />
            <div>
              <strong>{t("Confirm the Payment")}:</strong>
              <p className="mx-4">
                {t("Click the 'Payment Completed' button below.")}.
              </p>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="mt-10 p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-inner flex justify-start">
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              {t("Action Area")}:
            </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-600">
            <span className="flex-1 truncate text-[#1B1664] dark:text-gray-200 font-semibold">
              TLUmhJvQxGmNeURLu39Pw9LD6REu5A
            </span>
            <button className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#372E8B] text-white px-4 py-2 rounded-lg transition">
              <FaCopy /> {t("Copy Link")}
            </button>
          </div>

          <button className="mt-6 w-full sm:w-auto px-8 py-3 bg-[#1B1664] hover:bg-[#372E8B] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition">
            <FaCheckCircle /> {t("Payment Completed")}
          </button>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            🕒{" "}
            {t(
              "After clicking 'Payment Completed', your transaction will be verified shortly."
            )}
            .
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
