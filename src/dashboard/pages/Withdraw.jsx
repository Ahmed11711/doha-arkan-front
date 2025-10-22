import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaWallet,
  FaPlus,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ApiClient from "../../services/API";
import Popup from "../../components/common/Popup"; // ✅ هنضيفه تحت

export default function WithdrawDashboard() {
  const { t } = useTranslation();
  const [showSteps, setShowSteps] = useState(false);
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // 🟦 نفترض إن الرصيد متاح من API أو ثابت مؤقتًا
  const [availableBalance, setAvailableBalance] = useState(1200);

  const fetchWithdraws = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.get("/withdraw");
      setWithdraws(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdraws();
  }, []);

  // ✅ التحقق من البيانات
  const validateForm = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return t("Please enter a valid amount");
    }
    if (Number(amount) > availableBalance) {
      return t("Amount cannot exceed your available balance");
    }
    if (!address || !address.startsWith("T")) {
      return t("Address must start with 'T'");
    }
    return null;
  };

  const handleCreateWithdraw = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setPopupData({ success: false, message: errorMsg });
      return;
    }

    try {
      setSubmitting(true);
      const formData = { amount, address, symbol: "USDT" };
      const res = await ApiClient.post("/create-withdraw", formData);

      if (res.success) {
        setPopupData({
          success: true,
          message: t("Withdraw request submitted successfully!"),
        });
        setAmount("");
        setAddress("");
        fetchWithdraws();
      } else {
        setPopupData({
          success: false,
          message: res.message || t("Something went wrong."),
        });
      }
    } catch (err) {
      console.error(err);
      setPopupData({
        success: false,
        message: t("Server error occurred."),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 px-6 text-gray-900">
      <div className="w-full mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1B1664] flex items-center gap-3">
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

        {!showSteps && (
          <div>
            <h2 className="text-lg font-semibold mb-4">{t("Withdraw History")}</h2>
            {loading ? (
              <p className="text-gray-500">{t("Loading...")}</p>
            ) : withdraws.length === 0 ? (
              <p className="text-gray-500">{t("No withdraw history found.")}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left">{t("Date")}</th>
                      <th className="px-4 py-3 text-left">{t("Transaction ID")}</th>
                      <th className="px-4 py-3 text-left">{t("Address")}</th>
                      <th className="px-4 py-3 text-left">{t("Amount")}</th>
                      <th className="px-4 py-3 text-left">{t("Status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdraws.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">
                          {new Date(item.created_at).toLocaleDateString("en-GB")}
                        </td>
                        <td
                          className="px-4 py-3 truncate max-w-[150px] cursor-pointer"
                          title={item.transaction_id}
                          onClick={() => navigator.clipboard.writeText(item.transaction_id)}
                        >
                          {item.transaction_id.length > 10
                            ? item.transaction_id.slice(0, 10) + "..."
                            : item.transaction_id}
                        </td>
                        <td
                          className="px-4 py-3 truncate max-w-[150px] cursor-pointer"
                          title={item.address}
                          onClick={() => navigator.clipboard.writeText(item.address)}
                        >
                          {item.address.length > 10
                            ? item.address.slice(0, 10) + "..."
                            : item.address}
                        </td>
                        <td className="px-4 py-3">
                          {item.amount} {item.symbol}
                        </td>
                        <td
                          className={`px-4 py-3 font-medium ${
                            item.status === "completed"
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

            <div className="bg-gray-100 rounded-3xl p-6 md:p-8 shadow-inner">
              <h3 className="text-lg font-semibold mb-6 text-[#1B1664] flex items-center gap-2">
                <FaCheckCircle className="text-[#1B1664]" />
                {t("Complete Your Withdrawal")}
              </h3>

              {/* ✅ عرض الرصيد */}
              <p className="mb-4 text-gray-700">
                {t("Available Balance")}:{" "}
                <span className="font-semibold text-[#1B1664]">
                  ${availableBalance}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t("Enter amount")}
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border bg-white text-gray-900 outline-none focus:ring-2 focus:ring-[#1B1664] transition"
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t("Enter address")}
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border bg-white text-gray-900 outline-none focus:ring-2 focus:ring-[#1B1664] transition"
                />
                <button
                  onClick={handleCreateWithdraw}
                  disabled={submitting}
                  className={`px-8 py-3 rounded-lg flex items-center gap-2 transition ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1B1664] hover:bg-[#2C218E] text-white"
                  }`}
                >
                  {submitting ? (
                    t("Submitting...")
                  ) : (
                    <>
                      <FaArrowRight /> {t("Withdraw Request")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ البوباب */}
      {popupData && (
        <Popup
          success={popupData.success}
          message={popupData.message}
          onClose={() => setPopupData(null)}
        />
      )}
    </div>
  );
}
