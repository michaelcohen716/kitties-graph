import React, { useState } from "react";
import { Query } from "react-apollo";
import { GET_DAILY_TRENDS_SIRING } from "../../queries/siring";
import SectionHeadline from "../common/SectionHeadline";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { renderChart } from "./DailyTrends";

const cache = new InMemoryCache();

const customClient = new ApolloClient({
  uri:
    "https://api.thegraph.com/subgraphs/id/QmWWXFZyL4d4ZufbsaEpg8qhser4WWBEVFn7j1ZPZUZ7xZ",
  // uri: "https://api.thegraph.com/subgraphs/name/sudeepb02/cryptokitties-siringauction",
  cache
});

function SiringDailyTrends() {
  return (
    <Query query={GET_DAILY_TRENDS_SIRING} client={customClient}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          console.log("loading");
          return <p>loading...</p>;
        }

        if (error) {
          console.log("error", error);
          return <p>error...</p>;
        }
        console.log("siringdata", data);
        return (
          <div className="d-flex flex-column mx-auto">
            <SectionHeadline text="Siring Auctions Created - 10 Day Trend" />
            {renderChart(data, true)}
          </div>
        );
      }}
    </Query>
  );
}

export default SiringDailyTrends;
