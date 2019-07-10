import React, { useState } from "react";
import Tabs, { TABS } from "./Tabs";
import SalesSummary from "./SalesSummary";
import AuctionSummary from "./Auction/AuctionSummary";
import MyAnalysis from "./Masters/MyAnalysis";
import DailyTrends from "./Trends/DailyTrends"
import SiringDailyTrends from "./Trends/SiringDailyTrends"
import "./Home.css";

function Home() {
  const [activeTab, setActiveTab] = useState(TABS[3]);

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
    <div className="home mx-auto mt-5">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="d-flex">{activeView()}</div>
    </div>
  );
}

export default Home;
