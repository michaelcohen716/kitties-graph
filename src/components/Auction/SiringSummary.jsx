import React, { useState } from "react";
import { Query } from "react-apollo";
import { GET_SIRING_SUMMARY } from "../../queries/siringSummary";
import { customClient } from "../Trends/SiringDailyTrends";
import Loading from "../common/Loading";
import Error from "../common/Error";
import SectionHeadline from "../common/SectionHeadline";
import InfoUnit from "../InfoUnit";

function SiringSummary() {
  return (
    <Query query={GET_SIRING_SUMMARY} client={customClient}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          return <Loading />;
        }

        if (error) {
          return <Error />;
        }

        const { siringSummaries } = data;
        const {
          auctionsCancelled,
          auctionsCompleted,
          auctionsCreated,
          valueCompleted,
          valueCancelled,
          valueCreated
        } = siringSummaries[0];
        const timedOut =
          auctionsCreated - auctionsCancelled - auctionsCompleted;
        console.log("data", data);

        return (
          <div className="d-flex flex-column mx-auto mb-3">
            <SectionHeadline text="Siring Summary" />
            <InfoUnit
              title="Completed"
              value={auctionsCompleted}
              pct={auctionsCompleted / auctionsCreated}
            />
            <InfoUnit
              title="Cancelled"
              value={auctionsCancelled}
              pct={auctionsCancelled / auctionsCreated}
            />
            <InfoUnit
              title="Timed Out"
              value={timedOut}
              pct={timedOut / auctionsCreated}
            />
            <InfoUnit
              title="All Time Auctions"
              value={auctionsCreated}
              pct={true}
            />
            <InfoUnit
              title="Value Completed"
              value={valueCompleted}
              wei={true}
              />
            <InfoUnit
              title="Value Created"
              value={valueCreated}
              wei={true}
              />
            <InfoUnit
              title="Value Cancelled"
              value={valueCancelled}
              wei={true}
            />
          </div>
        );
      }}
    </Query>
  );
}

export default SiringSummary;
