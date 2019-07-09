import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import AuctionCreated from "./components/AuctionCreated";
import SalesSummary from "./components/SalesSummary";
import Home from "./components/Home";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/id/QmU1Nu96TQqhs61A9ixtBUWQhAPAMNjt4SH97cqYQT45U5",
  // uri: "https://api.thegraph.com/subgraphs/name/sudeepb02/cryptokitties-salesauction",
  cache
});

class App extends React.Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <Home>
          <SalesSummary />
        </Home>
      </ApolloProvider>
    )
  }
}

export default App;