import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import AuctionCreated from "./components/AuctionCreated";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/sudeepb02/cryptokitties-salesauction",
  cache
});

class App extends React.Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <AuctionCreated />
      </ApolloProvider>
    )
  }
}

export default App;