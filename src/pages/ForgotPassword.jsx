import React, { useState } from "react";
import ApiClient from "../services/API";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return enqueueSnackbar(t("forgotPassword.enterEmail"), { variant: "warning" });

    setLoading(true);
    try {
      await ApiClient.post("Auth/forgot-password", { email });
      enqueueSnackbar(t("forgotPassword.success"), { variant: "success" });
      localStorage.setItem("reset_email", email);
      navigate("/reset-password");
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t("forgotPassword.fail"), { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {t("forgotPassword.title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              {t("forgotPassword.emailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("forgotPassword.emailPlaceholder")}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? t("forgotPassword.sending") : t("forgotPassword.sendCode")}
          </button>
        </form>
      </div>
    </div>
  );
}
