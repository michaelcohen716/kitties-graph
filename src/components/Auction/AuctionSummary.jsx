import React from "react";
import { Query } from "react-apollo";
import { GET_SALES_SUMMARY } from "../../queries/salesSummary";
import InfoUnit from "../InfoUnit";
import SectionHeadline from "../common/SectionHeadline";
import Loading from "../common/Loading";
import Error from "../common/Error";
import SalesSummary from "../SalesSummary";
import SiringSummary from "./SiringSummary";

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
          return <Loading />
        }

        if (error) {
          return <Error />
        }

        const { salesSummary } = data;
        const {
          auctionsCompleted,
          auctionsCreated,
          auctionsCancelled
        } = salesSummary;

        const timedOut = auctionsCreated - auctionsCancelled - auctionsCompleted;

        return (
          <div className="d-flex flex-column mx-auto" style={{
            fontSize: "14px"
          }}>
            <SectionHeadline text="Sales Summary" />
            <InfoUnit title="Completed" value={auctionsCompleted} pct={auctionsCompleted / auctionsCreated} />
            <InfoUnit title="Cancelled" value={auctionsCancelled} pct={auctionsCancelled / auctionsCreated} />
            <InfoUnit title="Timed Out" value={timedOut} pct={timedOut / auctionsCreated} />
            <InfoUnit title="All Time Auctions" value={auctionsCreated} pct={true}/>
            <SalesSummary />
            <SiringSummary />
          </div>
        );
      }}
    </Query>
  );
}

export default AuctionSummary;