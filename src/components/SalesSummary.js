import React from "react";
import { Query } from "react-apollo";
import { GET_SALES_SUMMARY } from "../queries/salesSummary";
import InfoUnit from "./InfoUnit";
import NumberFormat from "react-number-format";
import Web3 from "web3";
import "./SalesSummary.css";

const web3 = new Web3();

function SalesSummary() {
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
        console.log("salesumamary", salesSummary);
        const {
          valueCompleted,
          valueCreated,
          valueCancelled,
          auctionsCompleted,
          auctionsCreated,
          auctionsCancelled
        } = salesSummary;

        return (
          <div className="d-flex flex-column mx-auto">
            <div className="d-flex justify-content-center summary-headline mb-3">
              Sales Summary
            </div>
            <InfoUnit title="Auctions Completed" value={auctionsCompleted} />
            <InfoUnit
              title="Auctions Created"
              value={auctionsCreated}
            />
            <InfoUnit
              title="Auctions Cancelled"
              value={auctionsCancelled}
            />
            <InfoUnit
              title="Value Completed"
              value={valueCompleted}
              wei={true}
            />
            <InfoUnit title="Value Created" value={valueCreated} wei={true} />
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

export default SalesSummary;
