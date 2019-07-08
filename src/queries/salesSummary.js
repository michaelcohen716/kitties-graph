import { gql } from "apollo-boost";

export const GET_SALES_SUMMARY = gql`
  query SalesSummary($id: Int!) {
    salesSummary(id: $id) {
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