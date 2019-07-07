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
          console.log("loading");
          return <p>loading...</p>;
        }

        if (error) {
          console.log("error", error);
          return <p>error...</p>;
        }

        const { auctionCreateds } = data;
        console.log("auction createds", auctionCreateds);

        return <div>query success?</div>;
      }}
    </Query>
  );
}

export default AuctionCreated;