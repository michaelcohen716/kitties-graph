import React, { useState } from "react";
import { Query } from "react-apollo";
import { GET_DAILY_TRENDS_SIRING } from "../../queries/siring";
import SectionHeadline from "../common/SectionHeadline";
import DatePickers from "../common/DatePickers";
import Loading from '../common/Loading';
import Error from '../common/Error';
import moment from "moment";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { renderChart } from "./DailyTrends";

const cache = new InMemoryCache();

const customClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/sudeepb02/cryptokitties-siringauction",
  cache
});

function SiringDailyTrends() {
  const newDate = startBool => {
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
    <Query
      query={GET_DAILY_TRENDS_SIRING}
      client={customClient}
      variables={{
        orderBy: "id",
        start: formattedStartDate,
        end: formattedEndDate
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          return <Error />
        }

        return (
          <div className="d-flex flex-column mx-auto">
            <SectionHeadline text="Siring Auctions Created - 10 Day Trend" />
            <DatePickers
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            {renderChart(data, true)}
          </div>
        );
      }}
    </Query>
  );
}

export default SiringDailyTrends;
