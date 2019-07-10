import { gql } from "apollo-boost";

export const GET_DAILY_TRENDS_SIRING = gql`
  query DailyStatSirings($start: String!, $end: String!) {
    dailyStatSirings(first: 10, orderBy: id, where: { id_gt: $start, id_lt: $end }) {
      id
      auctionsCreatedToday
    }
  }
`;