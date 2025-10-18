// PricingCard.jsx
import React from "react";

export default function PricingCard({
  plan,
  price,
  period,
  featured,
  features,
}) {
  return (
    <div
      className={`w-80 md:w-[22rem] p-8 mb-5 rounded-3xl bg-white dark:bg-gray-800 
      relative border transition-transform duration-300 hover:scale-105 
      ${featured ? "border-[#1B1664]" : "border-transparent"} 
      shadow-[0_20px_60px_rgba(0,0,0,0.15)]`}
    >
      {/* Save badge */}
      {featured && (
        <div
          style={{
            clipPath:
              "polygon(100% 0%, 75% 50%, 100% 100%, 0 100%, 0% 50%, 0 0)",
          }}
          className="absolute -right-8 top-3 bg-amber-300 text-amber-800 px-8 py-3 rounded text-xs font-semibold"
        >
          Save 20%
        </div>
      )}

      {/* Title */}
      <h4 className="text-gray-600 dark:text-gray-300 text-center font-semibold mb-1">
        {plan}
      </h4>

      {/* Price */}
      <div className="text-center my-5">
        <div className="flex items-end justify-center gap-2">
          <span className="text-sm line-through text-gray-400">
            ${(price * 1.3).toFixed(0)}
          </span>
          <span className="text-4xl font-extrabold text-[#1B1664] dark:text-amber-300">
            ${price}
          </span>
          <span className="text-sm text-gray-500">/{period}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          ${(price * 12).toFixed(0)} billed yearly
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-5 text-center">
        {`A comprehensive ${plan.toLowerCase()} solution to fit your needs.`}
      </p>

      <hr className="border-dashed border-gray-200 mb-5" />

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-4 text-sm">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                f.enabled
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {f.enabled ? (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <span
              className={`${
                f.enabled ? "text-gray-800 dark:text-white" : "text-gray-400"
              }`}
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="text-center">
        <button className="px-6 py-3 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition">
          Choose Plan
        </button>
      </div>
    </div>
  );
}
