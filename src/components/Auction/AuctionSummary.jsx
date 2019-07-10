import React from "react";
import { Query } from "react-apollo";
import { GET_SALES_SUMMARY } from "../../queries/salesSummary";
import InfoUnit from "../InfoUnit";
import SectionHeadline from "../common/SectionHeadline";
import SalesSummary from "../SalesSummary";

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

        const timedOut = auctionsCreated - auctionsCancelled - auctionsCompleted;

        return (
          <div className="d-flex flex-column mx-auto">
            <SectionHeadline text="Auction Summary" />
            <InfoUnit title="Completed" value={auctionsCompleted} pct={auctionsCompleted / auctionsCreated} />
            <InfoUnit title="Cancelled" value={auctionsCancelled} pct={auctionsCancelled / auctionsCreated} />
            <InfoUnit title="Timed Out" value={timedOut} pct={timedOut / auctionsCreated} />
            <InfoUnit title="All Time Auctions" value={auctionsCreated} pct={true}/>
            <SalesSummary />
          </div>
        );
      }}
    </Query>
  );
}

export default AuctionSummary;