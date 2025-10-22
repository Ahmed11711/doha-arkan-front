import React, { useState, useEffect } from "react";
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
import ApiClient from "../../services/API";
import { useAuth } from "../../context/AuthContext";

export default function DepositDashboard() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  const [showSteps, setShowSteps] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (user?.address) setUserAddress(user.address);
  }, [user]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await ApiClient.get("/deposit");
        setDeposits(res.data || []);
      } catch (err) {
        console.error("Error fetching deposits:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchDeposits();
  }, [isAuthenticated]);

  const handleCopy = () => {
    if (userAddress) navigator.clipboard.writeText(userAddress);
  };

  const handleCheckDeposit = async () => {
    setLoadingCheck(true);
    setShowPopup(false);

    try {
      const res = await fetch(
        "https://back.zayamrock.com/api/v1/check-deposit",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Auth_Token")}`,
          },
        }
      );

      const data = await res.json();

      if (data.success && data.data.total_new_amount > 0) {
        setIsSuccess(true);
        setPopupMessage(t("Your deposit was successful! 🎉"));
      } else {
        setIsSuccess(false);
        setPopupMessage(t("No deposit detected. Please try again."));
      }
      setShowPopup(true);
    } catch {
      setIsSuccess(false);
      setPopupMessage(t("An error occurred while checking your deposit."));
      setShowPopup(true);
    } finally {
      setLoadingCheck(false);
    }
  };

  const steps = [
    {
      icon: <FaLink />,
      title: t("Copy Your Deposit Link"),
      desc: t("Press 'Copy Link' or copy it manually."),
    },
    {
      icon: <FaArrowRight />,
      title: t("Open Your Payment App"),
      desc: t("Use Binance or another wallet to make the transfer."),
    },
    {
      icon: <FaClipboardCheck />,
      title: t("Complete the Transfer"),
      desc: t("Follow the app instructions to send the payment."),
    },
    {
      icon: <FaHome />,
      title: t("Return Here"),
      desc: t("After sending, come back to this page."),
    },
    {
      icon: <FaCheckCircle />,
      title: t("Confirm Deposit"),
      desc: t("Click 'Payment Completed' to verify your transfer."),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="w-full mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1B1664] flex items-center gap-2 sm:gap-3">
            <FaWallet className="text-[#1B1664]" /> {t("Deposit")}
          </h1>
          {!showSteps && (
            <button
              onClick={() => setShowSteps(true)}
              className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#2C218E] text-white px-4 sm:px-6 py-2 rounded-xl transition text-sm sm:text-base"
            >
              <FaPlus /> {t("New Deposit")}
            </button>
          )}
        </div>

        {/* History Table */}
        {!showSteps && (
          <div className="w-full">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              {t("Deposit History")}
            </h2>

            {loading ? (
              <p className="text-gray-500">{t("Loading...")}</p>
            ) : deposits.length === 0 ? (
              <p className="text-gray-500">
                {t("No deposit history available.")}
              </p>
            ) : (
              <>
                {/* ✅ Table for larger screens */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-[650px] w-full text-sm">
                    <thead className="bg-[#1B1664] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">{t("Date")}</th>
                        <th className="px-4 py-3 text-left">
                          {t("Transaction ID")}
                        </th>
                        <th className="px-4 py-3 text-left">{t("Address")}</th>
                        <th className="px-4 py-3 text-left">{t("Amount")}</th>
                        <th className="px-4 py-3 text-left">{t("Status")}</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {deposits.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            {new Date(item.created_at).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-700">
                            {item.transaction_id?.length > 12
                              ? `${item.transaction_id.slice(
                                  0,
                                  6
                                )}...${item.transaction_id.slice(-4)}`
                              : item.transaction_id}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-700">
                            {item.address?.length > 12
                              ? `${item.address.slice(
                                  0,
                                  6
                                )}...${item.address.slice(-4)}`
                              : item.address}
                          </td>
                          <td className="px-4 py-3">{item.amount}</td>
                          <td
                            className={`px-4 py-3 font-medium capitalize ${
                              item.status === "completed"
                                ? "text-green-600"
                                : item.status === "pending"
                                ? "text-yellow-500"
                                : "text-gray-500"
                            }`}
                          >
                            {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ✅ Cards for mobile view */}
                <div className="grid md:hidden gap-4">
                  {deposits.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {t("Date")}
                        </span>
                        <span className="text-sm font-semibold">
                          {new Date(item.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {t("Transaction ID")}
                        </span>
                        <span className="text-sm font-mono text-gray-700 truncate max-w-[140px]">
                          {item.transaction_id?.length > 12
                            ? `${item.transaction_id.slice(
                                0,
                                6
                              )}...${item.transaction_id.slice(-4)}`
                            : item.transaction_id}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {t("Address")}
                        </span>
                        <span className="text-sm font-mono text-gray-700 truncate max-w-[140px]">
                          {item.address?.length > 12
                            ? `${item.address.slice(
                                0,
                                6
                              )}...${item.address.slice(-4)}`
                            : item.address}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {t("Amount")}
                        </span>
                        <span className="text-sm font-semibold text-[#1B1664]">
                          {item.amount}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {t("Status")}
                        </span>
                        <span
                          className={`text-sm font-medium capitalize ${
                            item.status === "completed"
                              ? "text-green-600"
                              : item.status === "pending"
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Steps Section */}
        {showSteps && (
          <div>
            <button
              onClick={() => setShowSteps(false)}
              className="mb-6 text-[#1B1664] hover:underline text-sm sm:text-base"
            >
              ← {t("Back to History")}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md"
                  >
                    <div className="text-[#1B1664] text-xl sm:text-2xl mt-1">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1B1664] text-base sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action box */}
              <div className="bg-gray-100 rounded-2xl p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-5 text-[#1B1664] flex items-center gap-2">
                    <FaCheckCircle className="text-[#1B1664]" />
                    {t("Complete Your Action")}
                  </h3>

                  {/* Copy box */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white border border-gray-200 rounded-2xl p-4 mb-5">
                    <span
                      className="flex-1 truncate font-semibold text-[#1B1664] text-sm sm:text-base"
                      title={userAddress}
                    >
                      {userAddress || t("No address available")}
                    </span>
                    <button
                      onClick={handleCopy}
                      disabled={!userAddress}
                      className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#2C218E] text-white px-4 py-2 rounded-xl text-sm sm:text-base disabled:opacity-50"
                    >
                      <FaCopy /> {t("Copy Link")}
                    </button>
                  </div>

                  {/* QR */}
                  {userAddress && (
                    <div className="flex justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userAddress}`}
                        alt="QR Code"
                        className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg mt-4"
                      />
                    </div>
                  )}
                </div>

                {/* Confirm */}
                <div className="flex flex-col items-center mt-6">
                  {loadingCheck ? (
                    <div className="flex items-center gap-2 text-[#1B1664] text-sm">
                      <div className="w-5 h-5 border-4 border-[#1B1664] border-t-transparent rounded-full animate-spin"></div>
                      <span>{t("Checking your deposit...")}</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleCheckDeposit}
                      className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1B1664] hover:bg-[#2C218E] text-white rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base"
                    >
                      <FaCheckCircle /> {t("Payment Completed")}
                    </button>
                  )}

                  <p className="mt-3 text-xs sm:text-sm text-gray-500 text-center">
                    🕒{" "}
                    {t(
                      "After clicking 'Payment Completed', your transaction will be verified shortly."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm text-center relative">
              <h2
                className={`text-xl sm:text-2xl font-bold mb-3 ${
                  isSuccess ? "text-green-600" : "text-red-500"
                }`}
              >
                {isSuccess ? t("Deposit Successful") : t("Deposit Failed")}
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {popupMessage}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 sm:px-6 py-2 bg-[#1B1664] hover:bg-[#2C218E] text-white rounded-xl transition text-sm sm:text-base"
              >
                {t("Close")}
              </button>

              <div
                className={`absolute -top-6 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center shadow-lg ${
                  isSuccess ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <FaCheckCircle className="text-white text-lg sm:text-xl" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
