import React, { useState } from "react";
import Tabs, { TABS } from "./Tabs";
import SalesSummary from "./SalesSummary";
import AuctionSummary from "./Auction/AuctionSummary";
import MyAnalysis from "./Masters/MyAnalysis";
import DailyTrends from "./Trends/DailyTrends";
import SiringDailyTrends from "./Trends/SiringDailyTrends";
import "./Home.css";

function Home() {
  const [activeTab, setActiveTab] = useState(TABS[1]);

  const activeView = () => {
    switch (activeTab) {
      case TABS[0]: {
        return <MyAnalysis />;
      }

      case TABS[1]: {
        return <AuctionSummary />;
      }

      case TABS[2]: {
        return <DailyTrends />;
      }

      case TABS[3]: {
        return <SiringDailyTrends />;
      }

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto mt-2 header">
      <div className="header-text p-2">CryptoKitties Subgraph Dapp</div>
      <div className="home mx-auto mt-1">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="d-flex">{activeView()}</div>
      </div>
    </div>
  );
}

export default Home;
