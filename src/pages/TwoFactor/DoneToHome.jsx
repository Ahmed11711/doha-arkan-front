import React from "react";
import { useNavigate } from "react-router-dom";

export default function DoneToHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex pt-24 items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 flex flex-col items-center space-y-6 transition-all">
        <span className="w-20 h-20 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-4xl">
          ✓
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Verification Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
          You are now fully authenticated.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-4 rounded-xl font-semibold text-lg mt-4 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
