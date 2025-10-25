import {FaWallet} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
export default function EcommerceMetrics() {
  const { user } = useAuth();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
          {/* أيقونة المحفظة */}
          <FaWallet className="text-[#1B1664]" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">My Balance</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              {user.user_balance}
            </h4>
          </div>
        </div>
      </div>

      {/* My Affiliate Link */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
          {/* أيقونة اللينك */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 010 5.656l-4.95 4.95a4 4 0 01-5.656-5.656l1.414-1.414M10.172 13.828a4 4 0 010-5.656l4.95-4.95a4 4 0 015.656 5.656l-1.414 1.414"
            />
          </svg>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              My Affiliate Link
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <a
              href={user.your_affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 truncate hover:underline max-w-[80%]"
            >
              {user.your_affiliate_link}
            </a>

            <button
              onClick={() =>
                navigator.clipboard.writeText(user.your_affiliate_link)
              }
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-all"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
