import React, { useState } from "react";
import { FaUserFriends, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function AffiliateDashboard() {
  const { t } = useTranslation();

  const users = [
    {
      id: 1,
      name: "Doha Ali",
      email: "doha@example.com",
      joined: "2025-10-01",
      affiliates: [
        {
          id: 2,
          name: "Omar Khaled",
          email: "omar@example.com",
          joined: "2025-10-05",
          affiliates: [
            {
              id: 3,
              name: "Nour Ahmed",
              email: "nour@example.com",
              joined: "2025-10-10",
              affiliates: [],
            },
          ],
        },
        {
          id: 4,
          name: "Sara Mohamed",
          email: "sara@example.com",
          joined: "2025-10-08",
          affiliates: [],
        },
      ],
    },
  ];

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [breadcrumb, setBreadcrumb] = useState([users[0]]);

  const handleSelectAffiliate = (affiliate) => {
    setSelectedUser(affiliate);
    setBreadcrumb((prev) => [...prev, affiliate]);
  };

  const handleGoBack = () => {
    if (breadcrumb.length > 1) {
      const newPath = [...breadcrumb];
      newPath.pop();
      setBreadcrumb(newPath);
      setSelectedUser(newPath[newPath.length - 1]);
    }
  };

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
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

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#1B1664]">
          {t("User Information")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <p>
            <span className="font-medium">{t("Name")}:</span> {selectedUser.name}
          </p>
          <p>
            <span className="font-medium">{t("Email")}:</span> {selectedUser.email}
          </p>
          <p>
            <span className="font-medium">{t("Joined On")}:</span> {selectedUser.joined}
          </p>
          <p>
            <span className="font-medium">{t("Affiliates Count")}:</span>{" "}
            {selectedUser.affiliates.length}
          </p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-[#1B1664] mb-4">
          {t("Affiliate List")}
        </h3>

        {selectedUser.affiliates.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {t("No affiliates found for this user.")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#1B1664] text-white">
                  <th className="px-4 py-2">{t("Name")}</th>
                  <th className="px-4 py-2">{t("Email")}</th>
                  <th className="px-4 py-2">{t("Joined")}</th>
                  <th className="px-4 py-2 text-center">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.affiliates.map((aff) => (
                  <tr
                    key={aff.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{aff.name}</td>
                    <td className="px-4 py-2 truncate max-w-[200px]">{aff.email}</td>
                    <td className="px-4 py-2">{aff.joined}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleSelectAffiliate(aff)}
                        className="px-3 py-1 bg-[#1B1664FC] text-white rounded-md text-xs hover:bg-[#372E8B] transition"
                      >
                        {t("View")}
                      </button>
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
