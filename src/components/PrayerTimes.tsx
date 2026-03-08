import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes as AdhanPrayerTimes,
} from "adhan";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Sun, Moon, Sunrise, Sunset, Clock, Book } from "lucide-react";

export function PrayerTimes() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [view, setView] = useState<"prayer" | "azkar">("prayer");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ lat: 30.0444, lng: 31.2357 }); // Cairo
        },
      );
    } else {
      setLocation({ lat: 30.0444, lng: 31.2357 });
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    const coordinates = new Coordinates(location.lat, location.lng);
    const params = CalculationMethod.Egyptian();
    const date = new Date();
    const times = new AdhanPrayerTimes(coordinates, date, params);

    setPrayerTimes({
      fajr: times.fajr,
      sunrise: times.sunrise,
      dhuhr: times.dhuhr,
      asr: times.asr,
      maghrib: times.maghrib,
      isha: times.isha,
    });
  }, [location]);

  if (!prayerTimes) {
    return (
      <div className="flex justify-center items-center h-64 text-[#5A5A40]">
        جاري تحميل مواقيت الصلاة...
      </div>
    );
  }

  const prayers = [
    { id: "fajr", name: "الفجر", time: prayerTimes.fajr, icon: Moon },
    { id: "sunrise", name: "الشروق", time: prayerTimes.sunrise, icon: Sunrise },
    { id: "dhuhr", name: "الظهر", time: prayerTimes.dhuhr, icon: Sun },
    { id: "asr", name: "العصر", time: prayerTimes.asr, icon: Sun },
    { id: "maghrib", name: "المغرب", time: prayerTimes.maghrib, icon: Sunset },
    { id: "isha", name: "العشاء", time: prayerTimes.isha, icon: Moon },
  ];

  const azkarList = [
    { title: "أذكار الصباح", time: "بعد صلاة الفجر", icon: Sunrise },
    { title: "أذكار المساء", time: "بعد صلاة العصر", icon: Sunset },
    { title: "أذكار النوم", time: "قبل النوم", icon: Moon },
    { title: "أذكار الاستيقاظ", time: "عند الاستيقاظ", icon: Sun },
  ];

  return (
    <div className="space-y-6">
      <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 mb-6">
        <button
          onClick={() => setView("prayer")}
          className={`flex-1 py-3 rounded-full text-sm font-bold transition-colors ${
            view === "prayer"
              ? "bg-[#5A5A40] text-white"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          مواقيت الصلاة
        </button>
        <button
          onClick={() => setView("azkar")}
          className={`flex-1 py-3 rounded-full text-sm font-bold transition-colors ${
            view === "azkar"
              ? "bg-[#5A5A40] text-white"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          الأذكار
        </button>
      </div>

      {view === "prayer" ? (
        <>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-[#5A5A40] mb-2">
              مواقيت الصلاة
            </h2>
            <p className="text-gray-500">
              {format(new Date(), "EEEE، d MMMM yyyy", { locale: ar })}
            </p>
          </div>

          <div className="space-y-3">
            {prayers.map((prayer, index) => {
              const Icon = prayer.icon;
              const isNext = false; // Logic for next prayer can be added here
              return (
                <motion.div
                  key={prayer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-5 rounded-2xl ${
                    isNext
                      ? "bg-[#5A5A40] text-white shadow-md"
                      : "bg-white text-gray-800 border border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${isNext ? "bg-white/20" : "bg-[#f5f5f0]"}`}
                    >
                      <Icon
                        size={24}
                        className={isNext ? "text-white" : "text-[#5A5A40]"}
                      />
                    </div>
                    <span className="text-xl font-bold">{prayer.name}</span>
                  </div>
                  <span className="text-xl font-mono" dir="ltr">
                    {format(prayer.time, "hh:mm a")}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-[#E8E8E0] rounded-3xl p-6 mt-8">
            <h3 className="text-lg font-bold text-[#5A5A40] mb-3 flex items-center gap-2">
              <Clock size={20} />
              أوقات استجابة الدعاء
            </h3>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>بين الأذان والإقامة</li>
              <li>في الثلث الأخير من الليل</li>
              <li>عند السجود في الصلاة</li>
              <li>ساعة الاستجابة يوم الجمعة</li>
              <li>عند نزول المطر</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {azkarList.map((zekr, index) => {
            const Icon = zekr.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-[#5A5A40]/30 transition-colors text-right"
              >
                <div className="bg-[#f5f5f0] p-4 rounded-2xl text-[#5A5A40]">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {zekr.title}
                  </h3>
                  <p className="text-sm text-gray-500">{zekr.time}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
