import { gql } from "apollo-boost";

export const GET_DAILY_TRENDS = gql`
  query DailyStats($start: String!, $end: String!) {
    dailyStats(first: 10, orderBy: id, where: { id_gt: $start, id_lt: $end }) {
      id
      auctionsCreatedToday
      auctionsCompletedToday
    }
  }
`;
