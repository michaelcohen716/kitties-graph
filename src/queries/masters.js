import { gql } from "apollo-boost";

export const GET_MASTERS = gql`
  query Masters($id: ID!) {
    masters(where: { id: $id }) {
      id
      firstTransacted
      lastTransacted
      totalKittiesBought
      totalKittiesSold
      valueSpentBuying
      valueEarnedSelling
    }
  }
`;