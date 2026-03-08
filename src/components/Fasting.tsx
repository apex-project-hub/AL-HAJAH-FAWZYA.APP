import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Calendar, Info, CheckCircle, ChevronLeft } from 'lucide-react';
import { Tab } from '../types';

interface FastingProps {
  setActiveTab: (tab: Tab) => void;
}

export function Fasting({ setActiveTab }: FastingProps) {
  const [hijriDate, setHijriDate] = useState('');
  const [daysToRamadan, setDaysToRamadan] = useState(0);
  const [isRamadan, setIsRamadan] = useState(false);

  useEffect(() => {
    const today = new Date();
    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setHijriDate(hijriFormatter.format(today));

    // Approximate days to Ramadan
    const hijriParts = new Intl.DateTimeFormat('en-US-u-ca-islamic', { month: 'numeric', day: 'numeric' }).formatToParts(today);
    const hMonth = parseInt(hijriParts.find(p => p.type === 'month')?.value || '1');
    const hDay = parseInt(hijriParts.find(p => p.type === 'day')?.value || '1');

    if (hMonth === 9) {
      setIsRamadan(true);
    } else {
      let monthsAway = 9 - hMonth;
      if (monthsAway < 0) monthsAway += 12;
      
      let daysAway = (monthsAway * 29.5) - hDay;
      setDaysToRamadan(Math.floor(daysAway));
    }
  }, []);

  const ramadanDuties = [
    'النية الصادقة للصيام',
    'قراءة ورد يومي من القرآن',
    'المحافظة على صلاة التراويح',
    'إخراج زكاة الفطر',
    'الاعتكاف في العشر الأواخر',
    'كثرة الدعاء والاستغفار'
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2 text-[#5A5A40] font-medium mb-4"
      >
        <ChevronLeft size={20} />
        العودة للرئيسية
      </button>

      <div className="bg-[#2C3E50] text-white rounded-3xl p-6 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <Moon size={40} className="mx-auto mb-4 text-[#D4AF37]" />
        <h2 className="text-2xl font-bold mb-2">الصيام</h2>
        <p className="text-xl font-arabic mb-4">{hijriDate}</p>
        
        {isRamadan ? (
          <div className="bg-white/20 rounded-2xl p-4 mt-4">
            <p className="text-xl font-bold text-[#D4AF37]">مبارك عليكم الشهر</p>
            <p className="text-sm mt-1">تقبل الله صيامكم وقيامكم</p>
          </div>
        ) : (
          <div className="bg-white/10 rounded-2xl p-4 mt-4">
            <p className="text-sm text-white/80 mb-1">متبقي على رمضان تقريباً</p>
            <p className="text-3xl font-bold text-[#D4AF37]">{daysToRamadan} يوم</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-[#5A5A40] mb-4 flex items-center gap-2">
          <Info size={24} className="text-[#D4AF37]" />
          فوائد الصيام
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-[#5A5A40] shrink-0 mt-0.5" />
            <span>تزكية النفس وتعويدها على الصبر وتقوى الله.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-[#5A5A40] shrink-0 mt-0.5" />
            <span>الشعور بالفقراء والمحتاجين وتنمية روح التكافل.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-[#5A5A40] shrink-0 mt-0.5" />
            <span>فوائد صحية عظيمة كإراحة الجهاز الهضمي وتجديد الخلايا.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-[#5A5A40] shrink-0 mt-0.5" />
            <span>مغفرة الذنوب والعتق من النيران (من صام رمضان إيماناً واحتساباً).</span>
          </li>
        </ul>
      </div>

      {isRamadan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#E8E8E0] rounded-3xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold text-[#5A5A40] mb-4 flex items-center gap-2">
            <Calendar size={24} />
            واجبات وسنن رمضان
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ramadanDuties.map((duty, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl flex items-center gap-3 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                <span className="text-gray-800 text-sm font-bold">{duty}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
