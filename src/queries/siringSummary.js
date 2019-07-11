import { gql } from "apollo-boost";

export const GET_SIRING_SUMMARY = gql`
  query SiringSummary {
    siringSummaries {
      id
      auctionsCreated
      auctionsCompleted
      auctionsCancelled
      valueCreated
      valueCompleted
      valueCancelled
    }
  }
`;