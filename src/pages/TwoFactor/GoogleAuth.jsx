/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ApiClient from "../../services/API";

export default function GoogleAuth() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [view, setView] = useState("setup");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ qr: "", secret: "" });
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const setup = async () => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");
      const res = await ApiClient.post("Auth/send-otp", {
        user_id,
        method: "app",
      });
      setData({ secret: res.data || "" });
      localStorage.setItem("app_secret", res.data || "");
    } catch (err) {
      enqueueSnackbar("Failed to get authenticator secret ❌", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    if (!data.secret) return;
    navigator.clipboard.writeText(data.secret);
    enqueueSnackbar("Secret copied to clipboard ✅", { variant: "success" });
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9A-Za-z]?$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val.toUpperCase();
      setCode(newCode);
      if (val && index < 5) inputsRef.current[index + 1].focus();
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
      enqueueSnackbar("Please enter all 6 characters.", { variant: "warning" });
      return;
    }

    try {
      setLoading(true);
      const res = await ApiClient.post("Auth/verify-otp", {
        user_id,
        method: "app",
        code: otp,
      });

      console.log("Response:", res);

      if (res?.success) {
        enqueueSnackbar("Authenticator verified successfully ✅", {
          variant: "success",
        });
        setView("success");
      } else {
        enqueueSnackbar(res?.message || "Invalid code ❌", {
          variant: "error",
        });
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      enqueueSnackbar(err.response?.data?.message || "Verification failed ❌", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ========== Setup View ==========
  if (view === "setup") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-3xl p-16 flex flex-col items-center space-y-8 transition-all">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Google Authentication
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Connect your Authenticator app for two-factor authentication.
          </p>

          {loading ? (
            <div className="animate-spin w-12 h-12 border-b-2 border-red-600 rounded-full mt-8"></div>
          ) : (
            <>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Zayamrock:${data.secret}?secret=${data.secret}&issuer=Zayamrock`}
                alt="QR Code"
                className="w-48 h-48 rounded-lg mt-6"
              />
              <div className="flex items-center gap-2 max-w-lg w-full mt-6">
                <input
                  value={data.secret}
                  readOnly
                  className="w-full text-center font-mono px-3 py-2 rounded-md bg-gray-100 text-gray-900"
                />
                <button
                  onClick={handleCopy}
                  className="bg-gray-200 px-4 py-2 rounded-md"
                >
                  Copy
                </button>
              </div>

              <button
                onClick={() => setView("otp")}
                className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-4 rounded-xl font-semibold text-lg mt-6"
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ========== OTP View ==========
  if (view === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-3xl p-16 flex flex-col items-center space-y-8 transition-all">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Enter Google Authenticator Code
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Enter the 6-character code from your Authenticator app.
          </p>

          <div className="flex justify-between w-full mt-6 gap-4">
            {code.map((c, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                maxLength={1}
                value={c}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-16 h-16 text-center border-b-2 border-gray-400 text-gray-900 text-2xl font-semibold focus:border-[#1B1664FC] outline-none transition-all rounded-md"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-4 rounded-xl font-semibold text-lg transition-all"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    );
  }

  // ========== Success View ==========
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-3xl p-16 flex flex-col items-center space-y-8 transition-all">
        <span className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-3xl">
          ✓
        </span>
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Verified!
        </h1>
        <p className="text-gray-600 text-center text-lg">
          Your Google Authenticator is now connected.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-4 rounded-xl font-semibold text-lg transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
