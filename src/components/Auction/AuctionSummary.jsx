import React from "react";
import { Query } from "react-apollo";
import { GET_SALES_SUMMARY } from "../../queries/salesSummary";
import InfoUnit from "../InfoUnit";
import SectionHeadline from "../common/SectionHeadline";

function AuctionSummary() {
  return (
    <Query
      query={GET_SALES_SUMMARY}
      variables={{
        id: 1
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          console.log("loading");
          return <p>loading...</p>;
        }

        if (error) {
          console.log("error", error);
          return <p>error...</p>;
        }

        const { salesSummary } = data;
        const {
          auctionsCompleted,
          auctionsCreated,
          auctionsCancelled
        } = salesSummary;

        return (
          <div className="d-flex flex-column mx-auto">
            <SectionHeadline text="Auction Summary" />
            <InfoUnit title="Completed" value={auctionsCompleted} />
            <InfoUnit title="Cancelled" value={auctionsCancelled} />
            <InfoUnit title="Timed Out" value={auctionsCreated - auctionsCancelled - auctionsCompleted} />
            <InfoUnit title="Total Auctions Created" value={auctionsCreated} />
          </div>
        );
      }}
    </Query>
  );
}

export default AuctionSummary;