import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DatePickers.css"

function DatePickers({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="d-flex flex-column">
      <div className="instructions">Please pick a 10-day range</div>
      <div className="d-flex">
        <div className="d-flex flex-column">
          <div className="date-header">Start Date</div>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
        </div>
        <div className="d-flex flex-column">
          <div className="date-header">End Date</div>
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
      </div>
    </div>
  );
}

export default DatePickers;
