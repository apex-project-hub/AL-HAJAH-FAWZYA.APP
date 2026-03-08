import React from "react";
import { Home, Clock, BookOpen, Heart, Star } from "lucide-react";
import { Tab } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const tabs = [
    { id: "home", label: "الرئيسية", icon: Home },
    { id: "prayer", label: "الصلاة", icon: Clock },
    { id: "quran", label: "القرآن", icon: BookOpen },
    { id: "sebha", label: "السبحة", icon: Heart },
    { id: "pillars", label: "أركان الإسلام", icon: Star },
  ] as const;

  return (
    <div
      className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-arabic flex flex-col"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center text-white font-bold text-xl">
            ف
          </div>
          <h1 className="text-2xl font-bold text-[#5A5A40]">الحاجة فوزية</h1>
        </div>
        <p className="text-sm text-gray-500 italic">صدقة جارية</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 py-6 max-w-2xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive
                    ? "text-[#5A5A40]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div
                  className={`p-1 rounded-full ${isActive ? "bg-[#5A5A40]/10" : ""}`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
