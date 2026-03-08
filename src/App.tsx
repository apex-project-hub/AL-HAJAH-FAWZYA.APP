import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { PrayerTimes } from "./components/PrayerTimes";
import { Quran } from "./components/Quran";
import { Sebha } from "./components/Sebha";
import { Pillars } from "./components/Pillars";
import { Fasting } from "./components/Fasting";
import { Zakat } from "./components/Zakat";
import { Tab } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home setActiveTab={setActiveTab} />;
      case "prayer":
        return <PrayerTimes />;
      case "quran":
        return <Quran />;
      case "sebha":
        return <Sebha />;
      case "pillars":
        return <Pillars />;
      case "fasting":
        return <Fasting setActiveTab={setActiveTab} />;
      case "zakat":
        return <Zakat setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
