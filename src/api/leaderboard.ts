import { LeaderboardData } from '../types/leaderboard';
import { api, aocApi } from './index';

const getLeaderboard = async (
  year: number,
  leaderboardId: number,
): Promise<LeaderboardData> => {
  try {
    const { data } = await aocApi.get<LeaderboardData>(
      `/${year}/leaderboard/private/view/${leaderboardId}.json`,
    );
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reviews: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

const getLeaderboardJSON = async (
  filename: string,
): Promise<LeaderboardData> => {
  try {
    const { data } = await api.get<LeaderboardData>(`/${filename}.json`);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reviews: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export { getLeaderboard, getLeaderboardJSON };
