import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import PricingCard from "./PricingCard";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function PackagesCoverflow({ services }) {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([]);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (services?.length) {
      const firstPlans = services
        .map((s) => s.plans?.[0])
        .filter(Boolean)

        .map((p) => ({
          id: p.id,
          plan: p.name,
          price: parseFloat(p.amount),
          period: `${p.duration_months || 1} month(s)`,
          featured: false,
          features: [
            { label: p.desc, enabled: true },
            { label: `Profit Rate: ${p.profit_rate}%`, enabled: true },
            { label: `Cycle: ${p.profit_cycle} days`, enabled: true },
          ],
          serviceImg: p.img,
        }));

      setPlans(firstPlans);
    }
  }, [services]);

  const len = plans.length;
  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);
  const goTo = (i) => setIndex(i % len);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 4000);
    return () => clearInterval(autoplayRef.current);
  }, [len]);

  const handleMouseEnter = () => clearInterval(autoplayRef.current);
  const handleMouseLeave = () => {
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 4000);
  };

  if (!plans.length) return null; // لو مفيش باقات

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 bg-gray-100 overflow-hidden">
      <div className="text-center mb-12 relative px-4 md:px-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 relative z-10 inline-block">
          {t("sellWallets.title")}
        </h2>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-200 opacity-20 select-none z-0">
          {t("sellWallets.title")}
        </span>
        <p className="text-base sm:text-lg md:text-lg text-gray-600 mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
          {t("sellWallets.subtitle")}
        </p>
      </div>

      <div
        className="relative w-full max-w-6xl mx-auto flex flex-col items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* أزرار */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-[#1B1664] text-white w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#15104F] transition"
        >
          <FaArrowLeft className="text-xl sm:text-2xl" />
        </button>

        <div className="relative w-full h-[480px] sm:h-[420px] flex items-center justify-center overflow-visible perspective-[1200px]">
          {plans.map((p, i) => {
            const offset = i - index;
            const wrappedOffset =
              offset < -Math.floor(len / 2)
                ? offset + len
                : offset > Math.floor(len / 2)
                ? offset - len
                : offset;
            const abs = Math.abs(wrappedOffset);
            const translateX = wrappedOffset * 220;
            const rotateY = wrappedOffset * -25;
            const scale = Math.max(0.8, 1 - abs * 0.1);
            const z = 100 - abs * 10;

            return (
              <AnimatePresence key={p.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{ zIndex: z }}
                  className="absolute"
                  onClick={() => goTo(i)}
                >
                  <motion.div
                    animate={{
                      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="cursor-pointer"
                  >
                    <div className="mx-auto">
                      <PricingCard {...p} />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>

        <button
          onClick={next}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-[#1B1664] text-white w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#15104F] transition"
        >
          <FaArrowRight className="text-xl sm:text-2xl" />
        </button>

        {/* النقاط */}
        <div className="mt-10 flex items-center gap-3 z-10">
          {plans.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-[#1B1664]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
