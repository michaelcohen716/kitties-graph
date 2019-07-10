import React from "react";
import { Query } from "react-apollo";
import { GET_AUCTIONS } from "../queries/auctionCreated";

function AuctionCreated() {
  return (
    <Query
      query={GET_AUCTIONS}
      variables={{
        itemsPerPage: 10
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          return <p>loading...</p>;
        }

        if (error) {
          return <p>error...</p>;
        }

        const { auctionCreateds } = data;

        return <div>query success?</div>;
      }}
    </Query>
  );
}

export default AuctionCreated;