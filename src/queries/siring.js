import { gql } from "apollo-boost";

export const GET_DAILY_TRENDS_SIRING = gql`
  query DailyStatSirings{
    dailyStatSirings(first: 10, orderBy: id, orderDirection: desc) {
      id
      auctionsCreatedToday
    }
  }
`;