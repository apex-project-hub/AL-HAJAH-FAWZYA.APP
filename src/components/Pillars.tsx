import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export function Pillars() {
  const pillars = [
    {
      id: 1,
      title: "الشهادتان",
      description: "أشهد أن لا إله إلا الله، وأشهد أن محمداً رسول الله.",
      icon: "☝️",
      color: "bg-[#5A5A40]",
      textColor: "text-white",
    },
    {
      id: 2,
      title: "إقام الصلاة",
      description: "أداء الصلوات الخمس المفروضة في أوقاتها.",
      icon: "🕌",
      color: "bg-[#E8E8E0]",
      textColor: "text-[#5A5A40]",
    },
    {
      id: 3,
      title: "إيتاء الزكاة",
      description: "إخراج جزء معلوم من المال للمستحقين.",
      icon: "💰",
      color: "bg-[#D4C4B7]",
      textColor: "text-[#5A5A40]",
    },
    {
      id: 4,
      title: "صوم رمضان",
      description: "الامتناع عن المفطرات من طلوع الفجر إلى غروب الشمس.",
      icon: "🌙",
      color: "bg-[#F5E6D3]",
      textColor: "text-[#8B5A2B]",
    },
    {
      id: 5,
      title: "حج البيت",
      description: "قصد مكة لأداء مناسك الحج لمن استطاع إليه سبيلاً.",
      icon: "🕋",
      color: "bg-[#2C3E50]",
      textColor: "text-white",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-[#5A5A40] mb-2 flex items-center justify-center gap-2">
          <Star size={24} className="text-[#D4AF37]" />
          أركان الإسلام
        </h2>
        <p className="text-gray-500">بني الإسلام على خمس</p>
      </div>

      <div className="space-y-4">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${pillar.color} ${pillar.textColor} rounded-3xl p-6 shadow-sm relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mt-10 blur-2xl"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="text-4xl bg-white/20 p-3 rounded-2xl">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="opacity-50 text-sm font-mono">
                    {pillar.id}
                  </span>
                  {pillar.title}
                </h3>
                <p className="opacity-90 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
