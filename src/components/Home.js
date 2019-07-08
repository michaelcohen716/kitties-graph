import React, { useState } from "react";
import Tabs, { TABS } from "./Tabs";
import SalesSummary from "./SalesSummary";
import AuctionSummary from "./Auction/AuctionSummary";
import "./Home.css";

function Home() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const activeView = () => {
    switch (activeTab) {
      case TABS[0]: {
        return <SalesSummary />;
      }

      case TABS[1]: {
        return <AuctionSummary />
      }

      case TABS[2]: {
        return <div>daily sum</div>;
      }

      case TABS[3]: {
        return <div>monthly</div>;
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
