import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ApiClient from "../services/API";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export default function PricingCard({
  plan,
  price,
  featured,
  features,
  id,
  tabIndex,
  minimum_count, // الحد الأدنى لعدد الأسهم
}) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [showInstructions, setShowInstructions] = useState(false);
  const [showSharesPopup, setShowSharesPopup] = useState(false);
  const [shareCount, setShareCount] = useState(minimum_count);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAgree, setShowAgree] = useState(false);

  const isSharesPlan = id === 3 || plan.toLowerCase().includes("shares");
  const totalPrice = isSharesPlan ? price * shareCount : price;

  const handleChoosePlan = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (location.pathname !== "/services") {
      navigate(`/services?tab=${tabIndex}#plans`);
      return;
    }

    // ابدأ بالشروط
    setShowInstructions(true);
  };

  const handleAgreeInstructions = () => {
    setShowInstructions(false);
    // لو باقة أسهم، افتح بوباب الأسهم
    if (isSharesPlan) {
      setShareCount(minimum_count);
      setShowSharesPopup(true);
    } else {
      setShowConfirm(true);
    }
  };

  const handleConfirmShares = () => {
    setShowSharesPopup(false);
    setShowConfirm(true);
  };

  const handleConfirmPlan = async () => {
    if (!user || user.user_balance < totalPrice) {
      setShowConfirm(false);
      setShowInsufficient(true);
      return;
    }

    try {
      setLoading(true);
      const payload = isSharesPlan
        ? { wallet_id: id, count_unite: shareCount }
        : { wallet_id: id, count_unite: 1 };

      const res = await ApiClient.post("/userSubscribe", payload);
      console.log("✅ Plan subscribed:", res.data);

      setShowConfirm(false);
      enqueueSnackbar("✅ تم الاشتراك في الخطة بنجاح!", {
        variant: "success",
      });

      await ApiClient.post("/affiliate-after-subscribe", { wallet_id: id, count_unite: 1 });
    } catch (err) {
      console.error("❌ Subscription failed:", err);
      enqueueSnackbar("حدث خطأ أثناء الاشتراك، حاول مرة أخرى.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== CARD ===== */}
      <div
        className={`w-80 md:w-[22rem] p-8 mb-5 rounded-3xl bg-white 
        relative border transition-transform duration-300 hover:scale-105 
        ${featured ? "border-[#1B1664]" : "border-transparent"} 
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]`}
      >
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

        <h4
          className={`text-center font-semibold mb-1 ${
            isArabic ? "text-gray-800" : "text-gray-600"
          }`}
        >
          {plan}
        </h4>

        <div className="text-center my-5">
          <div className="flex items-end justify-center gap-2">
            <span className="text-4xl font-extrabold text-[#1B1664] ">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-5 text-center">
          {isArabic
            ? `حل شامل لخطة ${plan} لتلبية احتياجاتك.`
            : `A comprehensive ${plan} solution to fit your needs.`}
        </p>

        <hr className="border-dashed border-gray-200 mb-5" />

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
                {f.enabled ? "✔" : "✖"}
              </div>
              <span
                className={`${f.enabled ? "text-gray-800" : "text-gray-400"}`}
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <button
            onClick={handleChoosePlan}
            className="px-6 py-3 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
          >
            {isArabic ? "اختر باقة" : "Choose plan"}
          </button>
        </div>
      </div>

      {/* ===== نافذة الشروط ===== */}
      {showInstructions &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white w-full max-w-lg max-h-[80vh] rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Terms & Conditions
                </h2>
              </div>

              <div
                className="flex-1 overflow-y-auto px-6 py-4 text-gray-600 text-sm leading-relaxed"
                onScroll={(e) => {
                  const el = e.target;
                  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
                    setShowAgree(true);
                  }
                }}
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  {" "}
                  Your Agreement{" "}
                </h3>{" "}
                <p className="mb-3">
                  {" "}
                  By using this Site, you agree to be bound by, and to comply
                  with, these Terms and Conditions. If you do not agree to these
                  Terms and Conditions, please do not use this site.{" "}
                </p>{" "}
                <p className="mb-3">
                  {" "}
                  PLEASE NOTE: We reserve the right, at our sole discretion, to
                  change, modify or otherwise alter these Terms and Conditions
                  at any time. Unless otherwise indicated, amendments will
                  become effective immediately. Please review these Terms and
                  Conditions periodically.{" "}
                </p>{" "}
                <p className="mb-3">
                  {" "}
                  Your continued use of the Site following the posting of
                  changes and/or modifications will constitute your acceptance
                  of the revised Terms and Conditions. For your information,
                  this page was last updated as of the date at the top of these
                  terms and conditions.{" "}
                </p>{" "}
                <p className="mb-3">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ac leo eget sapien aliquet malesuada. Vivamus ultrices quam
                  sit amet sem tincidunt, ut blandit lectus sagittis.{" "}
                </p>{" "}
                <p>
                  {" "}
                  Nulla facilisi. Integer sed arcu sed elit blandit imperdiet.
                  Morbi porttitor metus sit amet metus condimentum, sed dictum
                  lacus facilisis.{" "}
                </p>{" "}
                <p className="mb-3">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ac leo eget sapien aliquet malesuada. Vivamus ultrices quam
                  sit amet sem tincidunt, ut blandit lectus sagittis.{" "}
                </p>{" "}
                <p>
                  {" "}
                  Nulla facilisi. Integer sed arcu sed elit blandit imperdiet.
                  Morbi porttitor metus sit amet metus condimentum, sed dictum
                  lacus facilisis.{" "}
                </p>{" "}
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAgreeInstructions}
                  disabled={!showAgree}
                  className={`px-5 py-2 rounded-md font-medium text-white shadow-md transition ${
                    showAgree
                      ? "bg-[#1B1664] hover:bg-[#1B1663]"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Agree
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* ===== نافذة الأسهم ===== */}
      {showSharesPopup &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white w-full max-w-md rounded-lg shadow-lg flex flex-col p-6"
            >
              <h3 className="text-lg font-semibold mb-4">
                {isArabic ? "اختر عدد الأسهم" : "Select number of shares"}
              </h3>

              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() =>
                    setShareCount((c) => Math.max(c - 1, minimum_count))
                  }
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-xl font-bold">{shareCount}</span>
                <button
                  onClick={() => setShareCount((c) => c + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <p className="mb-4 text-gray-700">
                {isArabic
                  ? `السعر الإجمالي: $${totalPrice.toFixed(2)}`
                  : `Total Price: $${totalPrice.toFixed(2)}`}
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowSharesPopup(false)}
                  className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </button>
                <button
                  onClick={handleConfirmShares}
                  className="px-8 py-2 rounded-full bg-[#1B1664] text-white hover:bg-[#15104F] transition"
                >
                  {isArabic ? "تأكيد" : "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* ===== نافذة التأكيد ===== */}
      {showConfirm &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-[90%] md:w-[500px] rounded-3xl shadow-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {isArabic
                  ? `هل أنت متأكد أنك تريد الاشتراك في خطة ${plan}?`
                  : `Are you sure you want to subscribe to the ${plan} plan?`}
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </button>
                <button
                  onClick={handleConfirmPlan}
                  disabled={loading}
                  className="px-8 py-2 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
                >
                  {loading
                    ? isArabic
                      ? "جارٍ الاشتراك..."
                      : "Subscribing..."
                    : isArabic
                    ? "تأكيد الاشتراك"
                    : "Confirm Subscription"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* ===== 💰 نافذة الرصيد غير الكافي ===== */}
      {showInsufficient &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-[90%] md:w-[450px] rounded-3xl shadow-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-[#1B1664] mb-4">
                {isArabic ? "الرصيد غير كافٍ 💰" : "Insufficient Balance 💰"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isArabic
                  ? "لا يمكنك الاشتراك في هذه الخطة لأن رصيدك الحالي لا يغطي ثمنها.\nيرجى الإيداع أولاً من صفحة المحفظة."
                  : "You cannot subscribe to this plan because your current balance does not cover the price.\nPlease deposit first from the wallet page."}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowInsufficient(false)}
                  className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  {isArabic ? "إغلاق" : "Close"}
                </button>
                <button
                  onClick={() => navigate("/dashboard/deposit")}
                  className="px-8 py-2 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
                >
                  {isArabic ? "الذهاب للإيداع" : "Go to Deposit"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}
