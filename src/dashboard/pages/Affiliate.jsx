import React, { useEffect, useState } from "react";
import { FaUserFriends, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import ApiClient from "../../services/API";

export default function AffiliateDashboard() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  const [affiliateList, setAffiliateList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rootUserId, setRootUserId] = useState();

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

    // ✅ استخدمي id الصحيح لأي مستخدم
    const prevUserId =
      prevUser?.user_id && prevUser?.user_id !== null
        ? prevUser.user_id
        : prevUser?.id;

    // ✅ لو ده المستخدم الأصلي (root)
    if (!prevUserId || prevUserId === user.id) {
      fetchAffiliate(); // بدون userId
    } else {
      fetchAffiliate(prevUserId); // بعت userId للمستخدم السابق
    }
  } else {
    // ✅ رجع لأول مستخدم رئيسي
    setAffiliateList([]);
    setSelectedUser(user);
    fetchAffiliate(); // استدعاء بدون userId يعيد الأصل
  }
};


  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1B1664] flex items-center gap-2">
          <FaUserFriends className="text-[#1B1664]" />
          {t("Affiliate Dashboard")}
        </h2>

        {breadcrumb.length > 1 && (
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-sm text-[#1B1664FC] hover:underline transition"
          >
            <FaArrowLeft /> {t("Back")}
          </button>
        )}
      </div>

      {/* Selected User Info */}
      {selectedUser && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[#1B1664]">
            {t("User Information")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 text-sm">
            <p>
              <span className="font-medium">{t("Name")}:</span>{" "}
              {selectedUser.name || "-"}
            </p>
            <p>
              <span className="font-medium">{t("Email")}:</span>{" "}
              {selectedUser.email || "-"}
            </p>
            <p>
              <span className="font-medium">{t("Phone")}:</span>{" "}
              {selectedUser.phone || "-"}
            </p>
            <p>
              <span className="font-medium">{t("Created At")}:</span>{" "}
              {selectedUser.created_at
                ? new Date(selectedUser.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      )}

      {/* Affiliate Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-[#1B1664] mb-4">
          {t("Affiliate List")}
        </h3>

        {loading ? (
          <p className="text-gray-500 text-sm">{t("Loading...")}</p>
        ) : affiliateList.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {t("No affiliates found for this user.")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#1B1664] text-white">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">{t("Name")}</th>
                  <th className="px-4 py-2">{t("Email")}</th>
                  <th className="px-4 py-2">{t("Phone")}</th>
                  <th className="px-4 py-2">{t("Created At")}</th>
                  <th className="px-4 py-2">{t("Profit money")}</th>
                  <th className="px-4 py-2">{t("Active")}</th>
                  <th className="px-4 py-2">{t("Generation")}</th>
                </tr>
              </thead>
              <tbody>
                {affiliateList.map((aff) => (
                  <tr
                    key={aff.random_id}
                    onClick={() => handleSelectAffiliate(aff)}
                    className="border-t border-gray-200 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <td className="px-4 py-2">{aff.random_id}</td>
                    <td className="px-4 py-2">{aff.name}</td>
                    <td className="px-4 py-2 truncate max-w-[200px]">
                      {aff.email}
                    </td>
                    <td className="px-4 py-2">{aff.phone || "-"}</td>
                    <td className="px-4 py-2">
                      {aff.created_at
                        ? new Date(aff.created_at).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Money color */}
                    <td
                      className={`px-4 py-2 text-center font-medium ${
                        parseFloat(aff.money) > 0
                          ? "bg-green-100 text-green-700 rounded-lg"
                          : ""
                      }`}
                    >
                      {aff.money || "0.00"}
                    </td>

                    {/* Active */}
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                          aff.active
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {aff.active ? "True" : "False"}
                      </span>
                    </td>

                    {/* Generation */}
                    <td className="px-4 py-2 text-center font-semibold text-[#1B1664]">
                      {aff.generation ? `G${aff.generation}` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
