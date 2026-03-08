import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, RotateCcw, Award } from "lucide-react";

export function Sebha() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    const savedTotal = localStorage.getItem("sebha_total");
    if (savedTotal) {
      setTotalCount(parseInt(savedTotal, 10));
    }
  }, []);

  const handleTasbeeh = () => {
    const newCount = count + 1;
    const newTotal = totalCount + 1;

    setCount(newCount);
    setTotalCount(newTotal);
    localStorage.setItem("sebha_total", newTotal.toString());

    if (newTotal % 1000 === 0 && newTotal > 0) {
      setShowReward(true);
      setTimeout(() => setShowReward(false), 5000);
    }

    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-[#5A5A40]">
          السبحة الإلكترونية
        </h2>
        <p className="text-gray-500">ألا بذكر الله تطمئن القلوب</p>
      </div>

      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleTasbeeh}
          className="w-64 h-64 bg-white rounded-full shadow-lg border-8 border-[#f5f5f0] flex flex-col items-center justify-center relative z-10 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#5A5A40] opacity-0 group-active:opacity-10 transition-opacity"></div>
          <span className="text-7xl font-bold text-[#5A5A40] font-mono">
            {count}
          </span>
          <span className="text-gray-400 mt-2 text-sm">اضغط للتسبيح</span>
        </motion.button>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-[#5A5A40]/10 rounded-full -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#5A5A40]/5 rounded-full -z-10"></div>
      </div>

      <div className="flex items-center gap-8 w-full max-w-xs justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">المجموع الكلي</p>
          <p className="text-xl font-bold text-[#5A5A40] font-mono">
            {totalCount}
          </p>
        </div>
        <div className="w-px h-10 bg-gray-200"></div>
        <button
          onClick={resetCount}
          className="flex flex-col items-center text-gray-400 hover:text-[#5A5A40] transition-colors"
        >
          <RotateCcw size={20} className="mb-1" />
          <span className="text-xs">تصفير العداد</span>
        </button>
      </div>

      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#5A5A40] mb-2">
                ما شاء الله!
              </h3>
              <p className="text-gray-600 mb-6">
                لقد أتممت 1000 تسبيحة. تقبل الله منك وجعلها في ميزان حسناتك
                وحسنات الحاجة فوزية.
              </p>
              <button
                onClick={() => setShowReward(false)}
                className="bg-[#5A5A40] text-white px-8 py-3 rounded-full font-bold w-full"
              >
                متابعة
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
