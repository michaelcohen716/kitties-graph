import React from "react";
import "./Tabs.css";

export const TABS = ["Sales Summary", "Auction Summary", "Daily", "Monthly"];

const Tab = ({ title, active, setActiveTab }) => {
  return (
    <div
      className={`tab d-flex justify-content-center p-2 ${
        active ? "active-tab" : "inactive-tab"
      }`}
      onClick={() => setActiveTab(title)}
    >
      <div className="my-auto">{title}</div>
    </div>
  );
};

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="d-flex">
      {TABS.map(t => {
        return (
          <Tab title={t} active={t === activeTab} setActiveTab={setActiveTab} />
        );
      })}
    </div>
  );
}

export default Tabs;
