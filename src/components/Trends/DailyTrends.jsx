import React, { useState } from "react";
import SectionHeadline from "../common/SectionHeadline";
import { GET_DAILY_TRENDS } from "../../queries/dailyTrends";
import { Query } from "react-apollo";
import LineChart from "react-linechart";
import Moment from "react-moment";
import "../../../node_modules/react-linechart/dist/styles.css";

export const renderChart = (dataInput, siring) => {
    let xMin, xMax;
  const dailyStats = siring ? dataInput.dailyStatSirings : dataInput.dailyStats;
  const points = dailyStats.reverse().map((p, i) => {
    let date = <Moment unix={true}>{Number(p.id) * 24 * 60 * 60}</Moment>;
    date = date.props.children;
    date = new Date(date * 1000);
    date = date.toString().split(" ");
    date = String(date[1]) + " " + String(date[2]);

    if(i === 0) xMin = date;

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
        (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    //   d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
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
  return (
    <div className="d-flex flex-column mx-auto">
      <SectionHeadline text="Auctions Created - 10 Day Trend" />
      <Query
        query={GET_DAILY_TRENDS}
        variables={{
          orderBy: "id"
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <p>loading...</p>;
          }

          if (error) {
            return <p>error...</p>;
          }

          return renderChart(data);
        }}
      </Query>
    </div>
  );
}

export default DailyTrends;
