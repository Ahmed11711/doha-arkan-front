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

  useEffect(() => {
    if (user?.address) {
      setUserAddress(user.address);
    }
  }, [user]);

  console.log("userrrr", user);

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

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleCheckDeposit = async () => {
    setLoadingCheck(true);
    setShowPopup(false);

    try {
      const res = await fetch("https://example.com/api/check-deposit", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Auth_Token")}`,
        },
      });

      const data = await res.json();

      if (data.success && data.data.total_new_amount > 0) {
        setIsSuccess(true);
        setPopupMessage(t("Your deposit was successful! 🎉"));
      } else {
        setIsSuccess(false);
        setPopupMessage(t("No deposit detected. Please try again."));
      }

      setShowPopup(true);
    } catch (error) {
      setIsSuccess(false);
      setPopupMessage(t("An error occurred while checking your deposit."));
      setShowPopup(true);
    } finally {
      setLoadingCheck(false);
    }
  };

  const handleCopy = () => {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress);
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
    <div className="min-h-screen pt-10 px-6 text-gray-900">
      <div className="w-full mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1B1664] flex items-center gap-3">
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

        {!showSteps && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {t("Deposit History")}
            </h2>

            {loading ? (
              <p className="text-gray-500">{t("Loading...")}</p>
            ) : deposits.length === 0 ? (
              <p className="text-gray-500">
                {t("No deposit history available.")}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
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
                  <tbody>
                    {deposits.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">
                          {new Date(item.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td
                          className="px-4 py-3 font-mono text-sm text-gray-700 truncate max-w-[160px]"
                          title={item.transaction_id}
                        >
                          {item.transaction_id?.length > 12
                            ? `${item.transaction_id.slice(
                                0,
                                6
                              )}...${item.transaction_id.slice(-4)}`
                            : item.transaction_id}
                        </td>
                        <td
                          className="px-4 py-3 font-mono text-sm text-gray-700 truncate max-w-[160px]"
                          title={item.address}
                        >
                          {item.address?.length > 12
                            ? `${item.address.slice(
                                0,
                                6
                              )}...${item.address.slice(-4)}`
                            : item.address}
                        </td>
                        <td className="px-4 py-3">
                          {item.amount} {item.symbol}
                        </td>
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
            )}
          </div>
        )}

        {showSteps && (
          <div>
            <button
              onClick={() => setShowSteps(false)}
              className="mb-8 text-[#1B1664] hover:underline"
            >
              ← {t("Back to History")}
            </button>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-[#1B1664] text-2xl mt-1">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#1B1664] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-100 rounded-3xl p-6 md:p-8 shadow-inner flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-[#1B1664] flex items-center gap-2">
                    <FaCheckCircle className="text-[#1B1664]" />
                    {t("Complete Your Action")}
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 mb-6">
                    <span
                      className="flex-1 truncate font-semibold text-[#1B1664]"
                      title={userAddress}
                    >
                      {userAddress ? userAddress : t("No address available")}
                    </span>
                    <button
                      onClick={handleCopy}
                      disabled={!userAddress}
                      className="flex items-center gap-2 bg-[#1B1664] hover:bg-[#2C218E] text-white px-5 py-2.5 rounded-xl transition disabled:opacity-50"
                    >
                      <FaCopy /> {t("Copy Link")}
                    </button>
                  </div>

                  {userAddress && (
                    <div className="flex justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userAddress}`}
                        alt="QR Code"
                        className="w-48 h-48 rounded-lg mt-6"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  {/* ✅ زر التأكيد */}
                  {loadingCheck ? (
                    <div className="flex items-center justify-center gap-2 text-[#1B1664]">
                      <div className="w-5 h-5 border-4 border-[#1B1664] border-t-transparent rounded-full animate-spin"></div>
                      <span>{t("Checking your deposit...")}</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleCheckDeposit}
                      className="mt-8 px-8 py-3 bg-[#1B1664] hover:bg-[#2C218E] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition w-full sm:w-auto"
                    >
                      <FaCheckCircle /> {t("Payment Completed")}
                    </button>
                  )}

                  <p className="mt-4 text-sm text-gray-500 text-center">
                    🕒{" "}
                    {t(
                      "After clicking 'Payment Completed', your transaction will be verified shortly."
                    )}
                  </p>

                  {/* 🔵 البوباب */}
                  {showPopup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center relative animate-fade-in">
                        <h2
                          className={`text-2xl font-bold mb-3 ${
                            isSuccess ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isSuccess
                            ? t("Deposit Successful")
                            : t("Deposit Failed")}
                        </h2>
                        <p className="text-gray-600 mb-6">{popupMessage}</p>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="px-6 py-2 bg-[#1B1664] hover:bg-[#2C218E] text-white rounded-xl transition"
                        >
                          {t("Close")}
                        </button>

                        {/* ✅ أيقونة ديكور */}
                        <div
                          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                            isSuccess ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          <FaCheckCircle className="text-white text-xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
