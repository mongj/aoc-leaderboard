import { useEffect, useState } from 'react';
import { LeaderboardData, Member } from '../types/leaderboard';
import { useSearchParams } from 'react-router-dom';
import getCurrentAdventDay from '../util/date';
import { ADVENT_DAYS, ADVENT_YEAR, LUCKY_DRAW_STARS } from '../util/constants';
import { Nullable } from '../types/utility';
import { DayStreak, LuckyDrawTicket } from './Badge';
import { TAB } from '../util/space';
import { getLeaderboardJSON } from '../api/leaderboard';

const EVENT = 2024;
const LEADERBOARD_IDS = [3247510, 1477899];
const LEADERBOARD_FILENAMES = ['leaderboard1', 'leaderboard2'];

enum SortOrder {
  Local = 'local_score',
  Global = 'global_score',
  Stars = 'stars',
}

const DEFAULT_SORT_ORDER = SortOrder.Stars;

interface RankedMember extends Member {
  rank: Nullable<number>;
}

function Leaderboard() {
  const [searchParams] = useSearchParams();
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>();
  const [sortedMembers, setSortedMembers] = useState<Member[]>([]);

  const sortOrder = (searchParams.get('order') ??
    DEFAULT_SORT_ORDER) as SortOrder;

  useEffect(() => {
    Promise.all(LEADERBOARD_FILENAMES.map((f) => getLeaderboardJSON(f))).then(
      ([data1, data2]) => {
        const mergedData = {
          ...data1,
          members: {
            ...data1.members,
            ...data2.members,
          },
        };
        setLeaderboard(mergedData);
      },
    );
  }, []);

  useEffect(() => {
    if (!leaderboard) return;

    switch (sortOrder) {
      case SortOrder.Local:
        setSortedMembers(
          Object.values(leaderboard.members).sort(
            (a, b) => b.local_score - a.local_score,
          ),
        );
        break;
      case SortOrder.Global:
        setSortedMembers(
          Object.values(leaderboard.members).sort(
            (a, b) => b.global_score - a.global_score,
          ),
        );
        break;
      case SortOrder.Stars:
        setSortedMembers(
          Object.values(leaderboard.members).sort((a, b) => b.stars - a.stars),
        );
        break;
    }
  }, [leaderboard, sortOrder]);

  if (!leaderboard) return null;

  const rankedMembers: RankedMember[] = [];
  for (let i = 0; i < sortedMembers.length; i++) {
    rankedMembers.push({
      ...sortedMembers[i],
      rank: i === 0 || sortedMembers[i - 1].stars !== 0 ? i + 1 : null,
    });
  }

  return (
    <>
      <LeaderboardDateHeader
        padLeft={rankedMembers.length.toString().length + 7}
      />
      {rankedMembers.map((member, index) => (
        <LeaderboardRow
          key={index}
          member={member}
          maxRank={rankedMembers.length}
        />
      ))}
    </>
  );
}

function LeaderboardDateHeader({ padLeft }: { padLeft: number }) {
  const currentDay = getCurrentAdventDay();

  // I'm sorry will clean this up later
  return (
    <div className="privboard-row">
      {' '.repeat(padLeft)}
      <span className="privboard-days">
        {Array.from({ length: ADVENT_DAYS }, (_, i) => i + 1).map(
          (day, index) => {
            const dateDisplay =
              day < 10 ? (
                day
              ) : (
                <>
                  {Math.floor(day / 10)}
                  <br />
                  {day % 10}
                </>
              );
            return day <= currentDay ? (
              <a key={index} href={`https://adventofcode.com/2024/day/${day}`}>
                {dateDisplay}
              </a>
            ) : (
              <span key={index}>{dateDisplay}</span>
            );
          },
        )}
      </span>
    </div>
  );
}

function LeaderboardRow({
  member,
  maxRank,
}: {
  member: RankedMember;
  maxRank: number;
}) {
  const getFormattedRank = (rank: Nullable<number>, maxRank: number) => {
    const maxLength = maxRank.toString().length + 1;
    if (!rank) {
      return ' '.repeat(maxLength);
    } else {
      return `${rank})`.padStart(maxLength, ' ');
    }
  };

  const getStarStyle = (day: number) => {
    if (day > getCurrentAdventDay()) {
      return 'privboard-star-locked';
    } else if (!member.completion_day_level[day]) {
      return 'privboard-star-unlocked';
    } else if (!member.completion_day_level[day][2]) {
      return 'privboard-star-firstonly';
    } else {
      return 'privboard-star-both';
    }
  };

  const getName = (name: string | null) => {
    return name ?? `(anonymous user #${member.id})`;
  };

  return (
    <div className="privboard-row">
      <span className="privboard-position">
        {getFormattedRank(member.rank, maxRank) + TAB}
      </span>
      <span className="star-count">
        {member.stars}*{TAB}
      </span>
      {Array.from({ length: ADVENT_DAYS }, (_, i) => i + 1).map(
        (day, index) => {
          return (
            <span key={index} className={getStarStyle(day)}>
              *
            </span>
          );
        },
      )}
      <span className="privboard-name">{getName(member.name)}</span> {member.stars >= LUCKY_DRAW_STARS ? <LuckyDrawTicket /> : (null)} <DayStreak year={ADVENT_YEAR} latestDay={getCurrentAdventDay()} completionDayLevel={member.completion_day_level} />
    </div>
  );
}

export default Leaderboard;
