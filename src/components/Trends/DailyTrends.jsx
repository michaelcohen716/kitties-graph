import React, { useState } from "react";
import SectionHeadline from "../common/SectionHeadline";
import { GET_DAILY_TRENDS } from "../../queries/dailyTrends";
import { Query } from "react-apollo";
import LineChart from "react-linechart";
import Moment from "react-moment";
import moment from "moment";
import DatePickers from "../common/DatePickers";
import "react-datepicker/dist/react-datepicker.css";
import "../../../node_modules/react-linechart/dist/styles.css";
import "./Trends.css";

export const renderChart = (dataInput, siring) => {
  let xMin, xMax;
  const dailyStats = siring ? dataInput.dailyStatSirings : dataInput.dailyStats;
  const points = dailyStats.reverse().map((p, i) => {
    let date = <Moment unix={true}>{Number(p.id) * 24 * 60 * 60}</Moment>;
    date = date.props.children;
    date = new Date(date * 1000);
    date = date.toString().split(" ");
    console.log("date before string", date);
    date = String(date[1]) + " " + String(date[2]);

    if (i === 0) xMin = date;

    console.log("date after string", date);
    return {
      x: Number(p.id) * 24 * 60 * 60,
      y: p.auctionsCreatedToday
    };
  });

  const data = [
    {
      color: "steelblue",
      points
    }
  ];

  const xDisplay = xValue => {
    const d = new Date(xValue * 1000);

    const formattedTime =
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    return formattedTime;
  };

  return (
    <LineChart
      yMin={0}
      xDisplay={xDisplay}
      hideXLabel
      hideYLabel
      width={600}
      height={400}
      data={data}
    />
  );
};

function DailyTrends() {
  const newDate = startBool => {
    // const date = startBool
      // ? moment().subtract(450, "days")
      //  : moment().subtract(440, "days");
    const date = startBool
      ? moment().subtract(11, "days")
       : moment().subtract(1, "days");
    return date._d;
  };
  const [startDate, setStartDate] = useState(newDate(true));
  const [endDate, setEndDate] = useState(newDate(false));

  const formatDate = dateObject =>
    String(Math.floor(dateObject.getTime() / 1000 / 24 / 60 / 60));

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <div className="d-flex flex-column mx-auto">
      <SectionHeadline text="Sales Auctions Created - 10 Day Trend" />
      <DatePickers
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Query
        query={GET_DAILY_TRENDS}
        variables={{
          orderBy: "id",
          start: formattedStartDate,
          end: formattedEndDate
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <p>loading...</p>;
          }

          if (error) {
            return <p>error...</p>;
          }
          console.log("data daily trebnds", data);

          return renderChart(data);
        }}
      </Query>
    </div>
  );
}

export default DailyTrends;
