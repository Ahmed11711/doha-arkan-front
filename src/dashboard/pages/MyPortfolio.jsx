import React, { useEffect, useState } from "react";
import ApiClient from "../../services/API";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export default function MyPortfolio() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await ApiClient.get("userSubscribe");
        if (res?.data) {
          setSubscriptions(res.data);
        } else {
          enqueueSnackbar(t("No data available"), { variant: "info" });
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(t("Failed to load data"), { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [enqueueSnackbar, t]);

  // eslint-disable-next-line no-unused-vars
  const handleViewProfit = (item) => {
    // enqueueSnackbar(
    //   `${t("Wallet")} #${item.wallet_id}: ${t("Your profit feature is coming soon!")}`,
    //   { variant: "info" }
    // );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#1B1664]">
          {t("My Portfolio")}
        </h3>

        <span className="text-sm text-gray-500">
          {t("Total")}: {subscriptions.length}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-10 text-gray-500 animate-pulse">
          {t("Loading...")}
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
          {t("No subscriptions found")}
        </div>
      ) : (
        <div className="w-full">
          {/* ===== Desktop Table ===== */}
          <div className="hidden md:block overflow-x-auto rounded-xl">
            <table className="w-full min-w-max text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#1B1664] to-[#2d258f] text-white">
                  {[
                    "ID",
                    t("Wallet Name"),
                    t("Start Date"),
                    t("End Date"),
                    t("Transaction ID"),
                    t("Price"),
                    t("Status"),
                    t("Created At"),
                    t("Actions"), // ✅ العمود الجديد
                  ].map((th, i) => (
                    <th key={i} className="px-4 py-3 font-medium">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((item, i) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-700">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.wallet_name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(item.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(item.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[180px]">
                      {item.transaction_id || "-"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600 text-center">
                      ${item.price}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t(item.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-center">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleViewProfit(item)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-[#1B1664] rounded-full hover:bg-[#2d258f] transition"
                      >
                        {t("View Profit")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Mobile Cards ===== */}
          <div className="md:hidden space-y-4">
            {subscriptions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#1B1664]">
                    {t("Wallet")} #{item.wallet_id}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t(item.status)}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>{t("Transaction ID")}:</strong>{" "}
                    {item.transaction_id || "-"}
                  </p>
                  <p>
                    <strong>{t("Start Date")}:</strong>{" "}
                    {new Date(item.start_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>{t("End Date")}:</strong>{" "}
                    {new Date(item.end_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>{t("Price")}:</strong>{" "}
                    <span className="font-semibold text-green-600">
                      ${item.price}
                    </span>
                  </p>
                  <p>
                    <strong>{t("Created At")}:</strong>{" "}
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* ✅ الزر الجديد في الموبايل */}
                <div className="text-center mt-4">
                  <button
                    onClick={() => handleViewProfit(item)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#1B1664] rounded-full hover:bg-[#2d258f] transition"
                  >
                    {t("View Profit")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
