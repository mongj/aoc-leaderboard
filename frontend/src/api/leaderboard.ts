import { LeaderboardData, LeaderboardListView } from '../types/leaderboard';
import api from './common';

const LEADERBOARD_ROUTE = '/leaderboards';

const getLeaderboard = async (): Promise<LeaderboardData> => {
  try {
    const { data } = await api.get<LeaderboardData>(`${LEADERBOARD_ROUTE}/merged`);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reviews: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

const getLeaderboardList = async (): Promise<LeaderboardListView[]> => {
  try {
    const { data } = await api.get<LeaderboardListView[]>(`${LEADERBOARD_ROUTE}`);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch leaderboard list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export { getLeaderboard, getLeaderboardList };
