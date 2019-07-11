import React from "react";
import { Query } from "react-apollo";
import { GET_SALES_SUMMARY } from "../queries/salesSummary";
import InfoUnit from "./InfoUnit";
import SectionHeadline from "./common/SectionHeadline";
import Error from "./common/Error";
import Loading from "./common/Loading";
import "./SalesSummary.css";

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
          return <Loading />;
        }

        if (error) {
          return <Error />;
        }

        const { salesSummary } = data;
        const { valueCompleted, valueCreated, valueCancelled } = salesSummary;

        return (
          <div className="d-flex flex-column mx-auto mt-2">
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
