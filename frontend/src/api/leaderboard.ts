import { LeaderboardData } from '../types/leaderboard';
import api from './common';

const getLeaderboard = async (): Promise<LeaderboardData> => {
  try {
    const { data } = await api.get<LeaderboardData>(`/leaderboards/merged`);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reviews: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export { getLeaderboard };
