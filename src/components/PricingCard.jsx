import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiClient from "../services/API";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ReactDOM from "react-dom";

export default function PricingCard({
  plan,
  price,
  period,
  featured,
  features,
  id,
}) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false); // ⚠️ للرصيد غير الكافي
  const [loading, setLoading] = useState(false);
  const [showAgree, setShowAgree] = useState(false);

  const handleChoosePlan = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      setShowInstructions(true);
    }
  };

  const handleAgreeInstructions = () => {
    setShowInstructions(false);
    setShowConfirm(true);
  };

  const handleConfirmPlan = async () => {
    // ✅ تحقق من الرصيد أولاً
    if (!user || user.user_balance < price) {
      setShowConfirm(false);
      setShowInsufficient(true); // أظهر نافذة الرصيد غير الكافي
      return;
    }

    try {
      setLoading(true);
      const res = await ApiClient.post("/userSubscribe", { wallet_id: id });
      console.log("✅ Plan subscribed:", res.data);
      setShowConfirm(false);
      alert("✅ تم الاشتراك في الخطة بنجاح!");
      const affRes = await ApiClient.post("/affiliate-after-subscribe", { wallet_id: id })
    } catch (err) {
      console.error("❌ Subscription failed:", err);
      alert("حدث خطأ أثناء الاشتراك، حاول مرة أخرى.");
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

        <h4 className="text-gray-600 text-center font-semibold mb-1">{plan}</h4>

        <div className="text-center my-5">
          <div className="flex items-end justify-center gap-2">
            <span className="text-sm line-through text-gray-400">
              ${(price * 1.3).toFixed(0)}
            </span>
            <span className="text-4xl font-extrabold text-[#1B1664] ">
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
            Choose Plan
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
                هل أنت متأكد أنك تريد الاشتراك في خطة{" "}
                <span className="text-[#1B1664]">{plan}</span>؟
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleConfirmPlan}
                  disabled={loading}
                  className="px-8 py-2 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
                >
                  {loading ? "جارٍ الاشتراك..." : "تأكيد الاشتراك"}
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
                الرصيد غير كافٍ 💰
              </h3>
              <p className="text-gray-600 mb-6">
                لا يمكنك الاشتراك في هذه الخطة لأن رصيدك الحالي لا يغطي ثمنها.
                <br />
                يرجى الإيداع أولاً من صفحة <strong>المحفظة</strong>.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowInsufficient(false)}
                  className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => navigate("/dashboard/deposit")}
                  className="px-8 py-2 rounded-full bg-[#1B1664] text-white font-medium hover:bg-[#15104F] transition"
                >
                  الذهاب للإيداع
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}
