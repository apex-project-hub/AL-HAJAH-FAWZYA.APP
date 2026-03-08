import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  ChevronLeft,
  Search,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import { Surah, Ayah } from "../types";

export function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSurahClick = (surah: Surah) => {
    setLoading(true);
    setSelectedSurah(surah);
    fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.alafasy`)
      .then((res) => res.json())
      .then((data) => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.includes(searchQuery) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading && !selectedSurah) {
    return (
      <div className="flex justify-center items-center h-64 text-[#5A5A40]">
        جاري تحميل القرآن الكريم...
      </div>
    );
  }

  if (selectedSurah) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedSurah(null)}
          className="flex items-center gap-2 text-[#5A5A40] font-medium mb-4"
        >
          <ChevronLeft size={20} />
          العودة للفهرس
        </button>

        <div className="bg-[#5A5A40] text-white rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
          <h2 className="text-4xl font-bold mb-2 font-arabic">
            {selectedSurah.name}
          </h2>
          <p className="text-white/80">
            {selectedSurah.revelationType === "Meccan" ? "مكية" : "مدنية"} •{" "}
            {selectedSurah.numberOfAyahs} آية
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32 text-[#5A5A40]">
            جاري تحميل الآيات...
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-8">
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div className="text-center text-3xl font-amiri text-[#5A5A40] mb-8">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
            <div
              className="text-justify leading-loose text-3xl font-amiri text-gray-800"
              dir="rtl"
            >
              {ayahs.map((ayah, index) => (
                <span key={ayah.number} className="inline">
                  {ayah.text.replace(
                    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                    "",
                  )}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm mx-2 font-mono">
                    {ayah.numberInSurah}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#5A5A40] mb-4 flex items-center gap-3">
          <BookOpen size={28} />
          القرآن الكريم
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن سورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f5f5f0] border-none rounded-2xl py-4 pr-12 pl-4 text-gray-700 focus:ring-2 focus:ring-[#5A5A40] outline-none"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {filteredSurahs.map((surah, index) => (
          <motion.button
            key={surah.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => handleSurahClick(surah)}
            className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 hover:border-[#5A5A40]/30 transition-colors text-right"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f5f5f0] rounded-xl flex items-center justify-center text-[#5A5A40] font-bold font-mono">
                {surah.number}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {surah.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {surah.revelationType === "Meccan" ? "مكية" : "مدنية"} •{" "}
                  {surah.numberOfAyahs} آية
                </p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400 font-mono">
                {surah.englishName}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
