import { gql } from "apollo-boost";

export const GET_DAILY_TRENDS = gql`
  query DailyStats{
    dailyStats(first: 10, orderBy: id, orderDirection: desc) {
      id
      auctionsCreatedToday
    }
  }
`;
