import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Clock,
  BookOpen,
  Heart,
  Star,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Coins,
} from "lucide-react";
import { Tab } from "../types";
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes as AdhanPrayerTimes,
} from "adhan";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface HomeProps {
  setActiveTab: (tab: Tab) => void;
}

export function Home({ setActiveTab }: HomeProps) {
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: Date;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

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
          // Default to Cairo if location fails
          setLocation({ lat: 30.0444, lng: 31.2357 });
        },
      );
    } else {
      setLocation({ lat: 30.0444, lng: 31.2357 });
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    const calculateNextPrayer = () => {
      const coordinates = new Coordinates(location.lat, location.lng);
      const params = CalculationMethod.Egyptian();
      const date = new Date();
      const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);

      const now = new Date();
      let next = prayerTimes.nextPrayer();
      let nextTime = prayerTimes.timeForPrayer(next);

      if (next === "none" || !nextTime) {
        // Next prayer is Fajr tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowPrayerTimes = new AdhanPrayerTimes(
          coordinates,
          tomorrow,
          params,
        );
        next = "fajr";
        nextTime = tomorrowPrayerTimes.fajr;
      }

      const prayerNames: Record<string, string> = {
        fajr: "الفجر",
        sunrise: "الشروق",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء",
      };

      setNextPrayer({ name: prayerNames[next], time: nextTime });

      const diff = nextTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 1000);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#5A5A40] text-white rounded-3xl p-6 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">السلام عليكم ورحمة الله</h2>
          <p className="text-white/80 text-sm mb-6">
            "اللهم اغفر لأمي وارحمها، وعافها واعف عنها، وأكرم نزلها ووسع مدخلها"
          </p>

          {nextPrayer && (
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">الصلاة القادمة</p>
                <p className="text-xl font-bold">{nextPrayer.name}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80 mb-1">متبقي</p>
                <p
                  className="text-xl font-mono font-bold tracking-wider"
                  dir="ltr"
                >
                  {timeRemaining}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <QuickActionCard
          icon={BookOpen}
          title="الورد القرآني"
          subtitle="تابع قراءتك"
          onClick={() => setActiveTab("quran")}
          color="bg-[#E8E8E0]"
          textColor="text-[#5A5A40]"
        />
        <QuickActionCard
          icon={Heart}
          title="السبحة"
          subtitle="اذكر الله"
          onClick={() => setActiveTab("sebha")}
          color="bg-[#D4C4B7]"
          textColor="text-[#5A5A40]"
        />
        <QuickActionCard
          icon={Sun}
          title="أذكار الصباح"
          subtitle="حصن نفسك"
          onClick={() => setActiveTab("prayer")}
          color="bg-[#F5E6D3]"
          textColor="text-[#8B5A2B]"
        />
        <QuickActionCard
          icon={Moon}
          title="أذكار المساء"
          subtitle="ختام يومك"
          onClick={() => setActiveTab("prayer")}
          color="bg-[#2C3E50]"
          textColor="text-white"
        />
        <QuickActionCard
          icon={Moon}
          title="الصيام"
          subtitle="رمضان والسنن"
          onClick={() => setActiveTab("fasting")}
          color="bg-[#5A5A40]"
          textColor="text-white"
        />
        <QuickActionCard
          icon={Coins}
          title="الزكاة والصدقة"
          subtitle="طهر مالك"
          onClick={() => setActiveTab("zakat")}
          color="bg-[#D4AF37]"
          textColor="text-white"
        />
      </div>

      {/* Deceased Reminder Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center"
      >
        <p className="text-gray-700 leading-relaxed font-arabic text-lg">
          هل تذكرت من فارقوا حياة الدنيا وذهبوا لمن هو مالك لهم ولنا؟ فلنتذكرهم سوياً بدعاء يرحمهم ويخفف عنهم ويرضيهم:
          <br /><br />
          <span className="font-bold text-[#5A5A40]">
            "اللهم اغفر لهم وارحمهم، وعافهم واعف عنهم، وأكرم نزلهم ووسع مدخلهم"
          </span>
          <br /><br />
          <span className="text-2xl">🙂</span>
        </p>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <Star className="text-[#D4AF37]" size={24} />
          <h3 className="text-lg font-bold text-[#5A5A40]">حديث اليوم</h3>
        </div>
        <p className="text-gray-700 leading-relaxed font-arabic text-lg">
          قال رسول الله ﷺ: "إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية،
          أو علم ينتفع به، أو ولد صالح يدعو له."
        </p>
        <p className="text-sm text-gray-400 mt-4 text-left">رواه مسلم</p>
      </motion.div>
    </div>
  );
}

function QuickActionCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
  color,
  textColor,
}: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${color} ${textColor} rounded-3xl p-5 flex flex-col items-start justify-between h-32 shadow-sm text-right w-full`}
    >
      <div className="bg-white/20 p-2 rounded-2xl mb-4">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
    </motion.button>
  );
}
