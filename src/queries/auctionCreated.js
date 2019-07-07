import { gql } from "apollo-boost";

export const GET_AUCTIONS = gql`
  query AuctionCreated($itemsPerPage: Int!) {
    auctionCreateds(first: $itemsPerPage) {
      id
      endingPrice
      startingPrice
      tokenId
    }
  }
`;