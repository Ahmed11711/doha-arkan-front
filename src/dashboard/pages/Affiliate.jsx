import React, { useEffect, useState } from "react";
import { FaUserFriends, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import ApiClient from "../../services/API";
import ReactDOM from "react-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { FaCopy } from "react-icons/fa";

export default function AffiliateDashboard() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { user, isAuthenticated } = useAuth();
  // console.log("user", user.affiliate_code_active);

  const [affiliateList, setAffiliateList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [rootUserId, setRootUserId] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.your_affiliate_link);
    setCopied(true);
    enqueueSnackbar("تم نسخ الرابط ✅", { variant: "success" });

    setTimeout(() => setCopied(false), 2000);
  };
  const fetchAffiliate = async (userId) => {
    try {
      setLoading(true);
      let endpoint = "/Affiliate";
      if (userId) endpoint = `/Affiliate?user_id=${userId}`;

      const res = await ApiClient.get(endpoint);

      if (!rootUserId && (userId || res?.data?.[0]?.user_id)) {
        setRootUserId(userId || res.data[0].user_id);
      }

      const dataWithRandomIds = (res.data || []).map((item) => ({
        ...item,
        random_id: Math.floor(Math.random() * 10000),
      }));

      setAffiliateList(dataWithRandomIds);
    } catch (err) {
      console.error("❌ Error fetching affiliate:", err);
      setAffiliateList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setSelectedUser(user);
      setBreadcrumb([user]);
      fetchAffiliate();
    }
  }, [isAuthenticated, user]);

  const handleSelectAffiliate = (affiliate) => {
    setSelectedUser(affiliate);
    setBreadcrumb((prev) => [...prev, affiliate]);
    fetchAffiliate(affiliate.user_id);
  };

  const handleGoBack = () => {
    if (breadcrumb.length > 1) {
      const newPath = [...breadcrumb];
      newPath.pop();

      const prevUser = newPath[newPath.length - 1];
      setBreadcrumb(newPath);
      setSelectedUser(prevUser);
      setAffiliateList([]);

      const prevUserId =
        prevUser?.user_id && prevUser?.user_id !== null
          ? prevUser.user_id
          : prevUser?.id;

      if (!prevUserId || prevUserId === user.id) {
        fetchAffiliate();
      } else {
        fetchAffiliate(prevUserId);
      }
    } else {
      setAffiliateList([]);
      setSelectedUser(user);
      fetchAffiliate();
    }
  };

  return (
    <div className="w-full space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {selectedUser?.id === user?.id && (
        <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-6 md:p-8 w-full mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B1664] flex items-center gap-2">
              <FaUserFriends className="text-[#1B1664]" />
              {t("Affiliate Dashboard")}
            </h2>
            {user?.affiliate_code_active && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 border border-green-300">
                {t("Active")}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-6">
              <p className="text-gray-500 mb-2">{t("Your Affiliate Link")}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={user.your_affiliate_link}
                  className="flex px-8 py-2 bg-gray-100 text-gray-700 text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 bg-[#1B1664] text-white hover:bg-[#15104F] transition flex items-center gap-2 rounded-lg whitespace-nowrap`}
                >
                  <FaCopy />
                  {copied ? t("Copied!") : t("Copy")}
                </button>
              </div>
            </div>

            {!user?.affiliate_code_active && (
              <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <p className="text-sm text-gray-700">
                  {t(
                    "Unlock your earning potential today — activate your affiliate code for only $100!"
                  )}
                </p>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-[#1B1664] text-white px-4 py-2 rounded-lg hover:bg-[#2b2490] transition text-sm whitespace-nowrap"
                >
                  {t("Activate Affiliate Code")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#1B1664] mb-4">
              {t("User Information")}
            </h3>
            {breadcrumb.length > 1 && (
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-sm bg-[#1B1664] text-white px-3 py-1.5 rounded-lg hover:bg-[#2b2490] transition"
              >
                <FaArrowLeft /> {t("Back")}
              </button>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-500 mb-2">{selectedUser.name}{"'s "}{t("Affiliate Link")}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={selectedUser.your_affiliate_link}
                className="flex px-8 py-2 bg-gray-100 text-gray-700 text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 bg-[#1B1664] text-white hover:bg-[#15104F] transition flex items-center gap-2 rounded-lg whitespace-nowrap`}
              >
                <FaCopy />
                {copied ? t("Copied!") : t("Copy")}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 text-sm">
            <InfoItem label={t("Name")} value={selectedUser.name || "-"} />
            <InfoItem label={t("Email")} value={selectedUser.email || "-"} />
            <InfoItem label={t("Phone")} value={selectedUser.phone || "-"} />
            <InfoItem
              label={t("Affiliate code")}
              value={
                selectedUser.affiliate_code ? selectedUser.affiliate_code : "-"
              }
            />
            {/* <InfoItem
              label={t("Created At")}
              value={
                selectedUser.created_at
                  ? new Date(selectedUser.created_at).toLocaleDateString()
                  : "-"
              }
            /> */}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#1B1664]">
            {t("Affiliate List")}
          </h3>

          <span className="text-sm text-gray-500">
            {t("Total")}: {affiliateList.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10 text-gray-500 animate-pulse">
            {t("Loading...")}
          </div>
        ) : affiliateList.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
            {t("No affiliates found for this user.")}
          </div>
        ) : (
          <div className="w-full">
            <div className="hidden md:block overflow-x-auto rounded-xl">
              <table className="w-full min-w-max text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1B1664] to-[#2d258f] text-white">
                    {[
                      "ID",
                      t("Name"),
                      t("Email"),
                      t("Phone"),
                      t("Created At"),
                      t("Profit money"),
                      t("Active"),
                      t("Generation"),
                    ].map((th, i) => (
                      <th
                        key={i}
                        className={`px-5 py-3 ${
                          isArabic ? "text-center" : "text-left"
                        } font-medium tracking-wide`}
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {affiliateList.map((aff) => (
                    <tr
                      key={aff.random_id}
                      onClick={() => handleSelectAffiliate(aff)}
                      className="border-t border-gray-100 hover:bg-blue-50 transition cursor-pointer"
                    >
                      <td className="px-4 py-3 text-gray-700">
                        {aff.random_id}
                      </td>
                      <td className="px-4 py-3 font-medium text-[#1B1664]">
                        {aff.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 truncate max-w-[200px]">
                        {aff.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {aff.phone || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {aff.created_at
                          ? new Date(aff.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td
                        className={`px-4 py-3 text-center font-semibold ${
                          parseFloat(aff.money) > 0
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {aff.money || "0.00"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            aff.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {aff.active ? t("Active") : t("Inactive")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-[#1B1664]">
                        {aff.generation ? `G${aff.generation}` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {affiliateList.map((aff) => (
                <div
                  key={aff.random_id}
                  onClick={() => handleSelectAffiliate(aff)}
                  className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#1B1664]">
                      {aff.name}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        aff.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {aff.active ? t("Active") : t("Inactive")}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>ID:</strong> {aff.random_id}
                    </p>
                    <p>
                      <strong>{t("Email")}:</strong> {aff.email}
                    </p>
                    <p>
                      <strong>{t("Phone")}:</strong> {aff.phone || "-"}
                    </p>
                    <p>
                      <strong>{t("Created At")}:</strong>{" "}
                      {aff.created_at
                        ? new Date(aff.created_at).toLocaleDateString()
                        : "-"}
                    </p>
                    <p>
                      <strong>{t("Profit money")}:</strong>{" "}
                      <span
                        className={`font-semibold ${
                          parseFloat(aff.money) > 0
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {aff.money || "0.00"}
                      </span>
                    </p>
                    <p>
                      <strong>{t("Generation")}:</strong>{" "}
                      <span className="font-semibold text-[#1B1664]">
                        {aff.generation ? `G${aff.generation}` : "-"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showConfirm &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-[90%] md:w-[500px] rounded-3xl shadow-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {t(
                  "فعّل كود التسويق الخاص بك الآن وابدأ في تحقيق الأرباح — مقابل 100 دولار فقط!"
                )}
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  {t("إلغاء")}
                </button>
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const response = await ApiClient.post(
                        "/active-affiliate"
                      );

                      if (response.success) {
                        setShowConfirm(false);
                        enqueueSnackbar(t("تم تفعيل كود التسويق بنجاح ✅"), {
                          variant: "success",
                        });
                        await ApiClient.post("/affiliate-after-subscribe-Affiliate");
                      } else {
                        enqueueSnackbar(
                          response.message || t("حدث خطأ أثناء التفعيل"),
                          { variant: "error" }
                        );
                      }
                    } catch (error) {
                      enqueueSnackbar(
                        error?.response?.data?.message ||
                          t("تعذر الاتصال بالخادم"),
                        { variant: "error" }
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="px-8 py-2 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
                >
                  {loading ? t("جارٍ التفعيل...") : t("تأكيد التفعيل")}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </span>
      <span className="font-medium text-gray-800 mt-1">{value}</span>
    </div>
  );
}
