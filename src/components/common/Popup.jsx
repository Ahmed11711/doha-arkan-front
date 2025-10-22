import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Popup({ success, message, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-6 text-center max-w-sm w-full mx-4"
        >
          {success ? (
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
          ) : (
            <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-3" />
          )}
          <p className="text-gray-700 mb-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-[#1B1664] hover:bg-[#2C218E] text-white px-6 py-2 rounded-lg font-semibold"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
