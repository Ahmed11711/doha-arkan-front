import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgMail } from "react-icons/cg";
import { FaSms } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import ApiClient from "../../services/API";
import { useSnackbar } from "notistack";

export default function TwoFactor() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const methods = [
    {
      title: "Verify via Email",
      description: "We will send a verification link to your email.",
      icon: <CgMail className="w-14 h-14 text-gray-900 dark:text-white" />,
      path: "/twofactor/email",
      method: "email",
      color: "bg-[#1B1664FC] hover:bg-[#372E8B]",
    },
    {
      title: "Verify via SMS",
      description: "We will send a verification code via SMS.",
      icon: <FaSms className="w-14 h-14 text-gray-900 dark:text-white" />,
      path: "/twofactor/sms",
      method: "sms",
      color: "bg-[#1B1664FC] hover:bg-[#372E8B]",
    },
    {
      title: "Verify via Authenticator App",
      description: "Use your Authenticator app to verify.",
      icon: <MdAppShortcut className="w-14 h-14 text-gray-900 dark:text-white" />,
      path: "/twofactor/google",
      method: "app",
      color: "bg-[#1B1664FC] hover:bg-[#372E8B]",
    },
  ];

  const handleSelectMethod = async (m) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      enqueueSnackbar("User ID not found. Please sign up again.", { variant: "error" });
      navigate("/auth");
      return;
    }

    try {
      setLoading(true);

      const res = await ApiClient.post("Auth/send-otp", {
        user_id,
        method: m.method,
      });

      enqueueSnackbar("Verification code sent successfully ✅", { variant: "success" });
      console.log(res.data);

      navigate(m.path);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to send verification code ❌", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-8 transition-all">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Two-Factor Authentication
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Choose a method to verify your account.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="text-sm text-primary-400 dark:text-primary-300 mt-2 underline hover:text-primary-600"
        >
          ← Back to Login
        </button>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {methods.map((method, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow transition-all hover:scale-105 cursor-pointer h-full"
            >
              <div className="mb-4">{method.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {method.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                {method.description}
              </p>
              <button
                disabled={loading}
                onClick={() => handleSelectMethod(method)}
                className={`${method.color} mt-4 w-full rounded-xl text-white py-3 font-semibold transition-all`}
              >
                {loading ? "Sending..." : "Continue →"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
