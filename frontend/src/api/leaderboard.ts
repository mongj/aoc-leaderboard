import { LeaderboardData, LeaderboardListView } from '../types/leaderboard';
import { api, localApi } from './common';

const LEADERBOARD_ROUTE = '/leaderboards';

const getLeaderboard = async (): Promise<LeaderboardData> => {
  try {
    const { data } = await api.get<LeaderboardData>(
      `${LEADERBOARD_ROUTE}/merged`,
    );
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch leaderboard: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

const getLeaderboardList = async (): Promise<LeaderboardListView[]> => {
  try {
    const { data } = await api.get<LeaderboardListView[]>(
      `${LEADERBOARD_ROUTE}`,
    );
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch leaderboard list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

const getLocalLeaderboard = async (): Promise<LeaderboardData> => {
  try {
    const { data } = await localApi.get<LeaderboardData>(
      `${LEADERBOARD_ROUTE}/leaderboard.json`,
    );
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch local leaderboard: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

const getLocalLeaderboardList = async (): Promise<LeaderboardListView[]> => {
  try {
    const { data } = await localApi.get<LeaderboardListView[]>(
      `${LEADERBOARD_ROUTE}/leaderboardList.json`,
    );
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch local leaderboard list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export {
  getLeaderboard,
  getLeaderboardList,
  getLocalLeaderboard,
  getLocalLeaderboardList,
};
