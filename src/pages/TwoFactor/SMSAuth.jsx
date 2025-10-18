/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ApiClient from "../../services/API";

export default function SMSAuth() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);
      if (val && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    const user_id = localStorage.getItem("user_id");

    if (otp.length < 6) {
      enqueueSnackbar("Please enter all 6 digits.", { variant: "warning" });
      return;
    }

    try {
      setLoading(true);
      const res = await ApiClient.post("Auth/verify-otp", {
        user_id,
        method: "sms",
        code: otp,
      });

      if (res.success) {
        enqueueSnackbar("Phone verified successfully ✅", { variant: "success" });
        navigate("/twofactor/done");
      } else {
        enqueueSnackbar("Invalid code ❌", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar("Verification failed ❌", { variant: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const user_id = localStorage.getItem("user_id");
      await ApiClient.post("Auth/send-otp", { user_id, method: "sms" });
      enqueueSnackbar("Code resent successfully ✅", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to resend code ❌", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-3xl p-16 flex flex-col items-center space-y-6 transition-all">
        <button
          onClick={() => navigate("/auth")}
          className="self-start text-sm text-primary-400 dark:text-primary-300 underline hover:text-primary-600 mb-4"
        >
          ← Back to Login
        </button>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
          SMS Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center text-xl">
          Enter the 6-digit code sent to your phone
        </p>

        <div className="flex justify-center flex-wrap gap-3 w-full mt-4">
          {code.map((c, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              maxLength={1}
              value={c}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-20 h-20 text-center border-b-2 border-gray-400 dark:border-gray-500 text-gray-900 dark:text-white text-3xl font-bold focus:border-[#1B1664FC] outline-none transition-all rounded-lg"
            />
          ))}
        </div>

        <button
          onClick={handleResend}
          disabled={loading}
          className="text-sm text-primary-400 dark:text-primary-300 underline hover:text-primary-600 mt-2"
        >
          {loading ? "Resending..." : "Resend Code"}
        </button>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-5 rounded-2xl font-bold text-xl transition-all mt-4"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
