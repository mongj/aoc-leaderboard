import { useState } from 'react';

import { useEffect } from 'react';
// import { getLeaderboardList } from '../api/leaderboard';
import { getLocalLeaderboardList } from '../api/leaderboard';
import { LeaderboardListView } from '../types/leaderboard';

function LeaderboardList() {
  const [leaderboardList, setLeaderboardList] =
    useState<LeaderboardListView[]>();

  useEffect(() => {
    getLocalLeaderboardList().then(setLeaderboardList);
  }, []);

  if (!leaderboardList) {
    return null;
  }

  return (
    <div>
      <p>
        You can join one of our leaderboards by entering the invite code below
        on the Advent of Code leaderboard page{' '}
        <a
          href="https://adventofcode.com/2024/leaderboard/private"
          target="_blank"
        >
          here
        </a>
        .
      </p>
      <ul>
        {leaderboardList.map((leaderboard) => (
          <li key={leaderboard.id}>
            <code>{leaderboard.invite_code}</code>&nbsp;
            <span>({leaderboard.size}/200 members)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderboardList;
