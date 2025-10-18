import React, { useState } from "react";
import ApiClient from "../services/API";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const email = localStorage.getItem("reset_email");

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return enqueueSnackbar(t("resetPassword.noEmail"), { variant: "error" });
    if (password !== confirmPassword)
      return enqueueSnackbar(t("resetPassword.mismatch"), { variant: "warning" });

    setLoading(true);
    try {
      await ApiClient.post("Auth/reset-password", { email, otp: code, password });
      enqueueSnackbar(t("resetPassword.success"), { variant: "success" });
      localStorage.removeItem("reset_email");
      navigate("/login");
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t("resetPassword.fail"), { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {t("resetPassword.title")}
        </h2>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              {t("resetPassword.codeLabel")}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t("resetPassword.codePlaceholder")}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              {t("resetPassword.passwordLabel")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("resetPassword.passwordPlaceholder")}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              {t("resetPassword.confirmPasswordLabel")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("resetPassword.passwordPlaceholder")}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? t("resetPassword.updating") : t("resetPassword.changePassword")}
          </button>
        </form>
      </div>
    </div>
  );
}
