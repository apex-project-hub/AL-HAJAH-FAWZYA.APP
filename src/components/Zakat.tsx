import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coins, Calendar, Bell, Info, ChevronLeft, Wallet } from 'lucide-react';
import { Tab } from '../types';

interface ZakatProps {
  setActiveTab: (tab: Tab) => void;
}

export function Zakat({ setActiveTab }: ZakatProps) {
  const [zakatDate, setZakatDate] = useState('');
  const [sadaqahDate, setSadaqahDate] = useState('');
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    const savedZakat = localStorage.getItem('zakat_date');
    const savedSadaqah = localStorage.getItem('sadaqah_date');
    if (savedZakat) setZakatDate(savedZakat);
    if (savedSadaqah) setSadaqahDate(savedSadaqah);

    checkReminders(savedZakat, savedSadaqah);
  }, []);

  const checkReminders = (zDate: string | null, sDate: string | null) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let msgs = [];

    if (zDate) {
      const z = new Date(zDate);
      z.setHours(0, 0, 0, 0);
      if (z.getTime() === today.getTime()) msgs.push('اليوم هو موعد إخراج زكاتك المحددة.');
      else if (z.getTime() === tomorrow.getTime()) msgs.push('غداً هو موعد إخراج زكاتك، استعد.');
    }

    if (sDate) {
      const s = new Date(sDate);
      s.setHours(0, 0, 0, 0);
      if (s.getTime() === today.getTime()) msgs.push('اليوم هو موعد صدقتك المحددة.');
      else if (s.getTime() === tomorrow.getTime()) msgs.push('غداً هو موعد صدقتك، تقبل الله.');
    }

    setReminder(msgs.join(' | '));
  };

  const saveZakat = (e: any) => {
    setZakatDate(e.target.value);
    localStorage.setItem('zakat_date', e.target.value);
    checkReminders(e.target.value, sadaqahDate);
  };

  const saveSadaqah = (e: any) => {
    setSadaqahDate(e.target.value);
    localStorage.setItem('sadaqah_date', e.target.value);
    checkReminders(zakatDate, e.target.value);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2 text-[#5A5A40] font-medium mb-4"
      >
        <ChevronLeft size={20} />
        العودة للرئيسية
      </button>

      <div className="bg-[#D4AF37] text-white rounded-3xl p-6 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <Coins size={40} className="mx-auto mb-4 text-white" />
        <h2 className="text-2xl font-bold mb-2">الزكاة والصدقة</h2>
        <p className="text-white/90 text-sm">طهر مالك وبارك فيه</p>
      </div>

      {reminder && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#5A5A40] text-white p-4 rounded-2xl shadow-md flex items-center gap-3"
        >
          <Bell size={24} className="shrink-0 text-[#D4AF37]" />
          <p className="font-bold text-sm leading-relaxed">{reminder}</p>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-[#5A5A40] mb-4 flex items-center gap-2">
          <Info size={24} className="text-[#D4AF37]" />
          الفرق بين الزكاة والصدقة
        </h3>
        
        <div className="space-y-4">
          <div className="bg-[#f5f5f0] p-4 rounded-2xl border-r-4 border-[#5A5A40]">
            <h4 className="font-bold text-lg text-[#5A5A40] mb-2 flex items-center gap-2">
              <Wallet size={20} /> الزكاة
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              فريضة وركن من أركان الإسلام. تجب في أموال محددة (كالمال والذهب والفضة وعروض التجارة) إذا بلغت <strong>النصاب</strong> وحال عليها <strong>الحول</strong> (سنة هجرية كاملة). النسبة الموصى بها هي <strong>2.5%</strong>.
            </p>
          </div>

          <div className="bg-[#f5f5f0] p-4 rounded-2xl border-r-4 border-[#D4AF37]">
            <h4 className="font-bold text-lg text-[#D4AF37] mb-2 flex items-center gap-2">
              <Heart size={20} /> الصدقة
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              تطوع واختيارية، ليس لها وقت محدد ولا نصاب ولا مقدار معين. يمكن إخراجها من الراتب أو ما فاض عن الحاجة في أي وقت للتقرب إلى الله.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#E8E8E0] rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#5A5A40] mb-4 flex items-center gap-2">
          <Calendar size={24} />
          غرفة التذكير والجدولة
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          حدد مواعيدك وسنقوم بتذكيرك في اليوم المحدد وقبله بيوم.
        </p>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              موعد إخراج الزكاة السنوي
            </label>
            <input
              type="date"
              value={zakatDate}
              onChange={saveZakat}
              className="w-full bg-[#f5f5f0] border-none rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-[#5A5A40] outline-none font-mono"
            />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              موعد إخراج الصدقة (الشهري/الدوري)
            </label>
            <input
              type="date"
              value={sadaqahDate}
              onChange={saveSadaqah}
              className="w-full bg-[#f5f5f0] border-none rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-[#D4AF37] outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
