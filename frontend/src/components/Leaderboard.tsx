import { useEffect, useState } from 'react';
import { LeaderboardData, Member } from '../types/leaderboard';
import { useSearchParams } from 'react-router-dom';
import { getCurrentAdventDay, formatDate } from '../util/date';
import { ADVENT_DAYS, ADVENT_YEAR, LUCKY_DRAW_STARS } from '../util/constants';
import { Nullable } from '../types/utility';
import { DayStreak, LuckyDrawTicket } from './Badge';
// import { getLeaderboard } from '../api/leaderboard';
import { getLocalLeaderboard } from '../api/leaderboard';
import { sortByLocalScore, sortByStars } from '../util/sorting';
import { TAB } from '../util/space';

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

  let sortOrder = (searchParams.get('order') ??
    DEFAULT_SORT_ORDER) as SortOrder;

  if (!Object.values(SortOrder).includes(sortOrder as SortOrder)) {
    sortOrder = DEFAULT_SORT_ORDER;
  }

  useEffect(() => {
    getLocalLeaderboard().then(setLeaderboard);
  }, []);

  useEffect(() => {
    if (!leaderboard) return;

    switch (sortOrder) {
      case SortOrder.Local:
        setSortedMembers(
          sortByLocalScore(leaderboard.members, getCurrentAdventDay()),
        );
        break;
      case SortOrder.Global:
        setSortedMembers(
          leaderboard.members.sort((a, b) => b.global_score - a.global_score),
        );
        break;
      case SortOrder.Stars:
        setSortedMembers(
          sortByStars(leaderboard.members, getCurrentAdventDay()),
        );
        break;
      default:
        setSortedMembers(leaderboard.members.sort((a, b) => b.stars - a.stars));
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

  // Statistics
  const count50Stars = sortedMembers.filter(
    (member) => member.stars === 50,
  ).length;
  const count20Stars = sortedMembers.filter(
    (member) => member.stars >= 20,
  ).length;
  const count1Star = sortedMembers.filter((member) => member.stars >= 1).length;

  return (
    <>
      <section>
        <p>Some Statistics</p>
        <ul>
          <li>
            <code>{count50Stars}</code>{' '}
            {count50Stars > 1 ? 'people have' : 'person has'} obtained {`== `}
            <span className="star-count">{`50*`}</span>
          </li>
          <li>
            <code>{count20Stars}</code>{' '}
            {count20Stars > 1 ? 'people have' : 'person has'} obtained {`>= `}
            <span className="star-count">{`20*`}</span>
          </li>
          <li>
            <code>{count1Star}</code>{' '}
            {count1Star > 1 ? 'people have' : 'person has'} obtained {`>= `}
            <span className="star-count">{`1*`}</span>
          </li>
        </ul>
      </section>
      <p>
        Last updated: <code>{formatDate(leaderboard.last_updated)}</code>
      </p>
      <LeaderboardDateHeader
        padLeft={
          sortOrder == SortOrder.Stars
            ? rankedMembers.length.toString().length + 7
            : rankedMembers.length.toString().length +
              rankedMembers[0]?.local_score?.toString().length +
              3
        }
      />
      {rankedMembers.map((member, index) =>
        sortOrder == SortOrder.Stars ? (
          <LeaderboardRowStars
            key={index}
            member={member}
            maxRank={rankedMembers.length}
          />
        ) : (
          <LeaderboardRowScore
            key={index}
            member={member}
            maxRank={rankedMembers.length}
            maxScore={rankedMembers[0].local_score}
          />
        ),
      )}
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
              <a
                key={index}
                href={`https://adventofcode.com/2024/day/${day}`}
                target="_blank"
              >
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

function LeaderboardRowTemplate({
  member,
  maxRank,
  children,
}: {
  member: RankedMember;
  maxRank: number;
  children: React.ReactNode;
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
        {getFormattedRank(member.rank, maxRank)}
      </span>
      {children}
      {Array.from({ length: ADVENT_DAYS }, (_, i) => i + 1).map(
        (day, index) => {
          return (
            <span key={index} className={getStarStyle(day)}>
              *
            </span>
          );
        },
      )}
      {TAB}
      <span className="privboard-name">
        {member.socials_link ? (
          <a href={member.socials_link} target="_blank">
            {getName(member.name)}
          </a>
        ) : (
          getName(member.name)
        )}
        &nbsp;
      </span>
      {member.stars >= LUCKY_DRAW_STARS && <LuckyDrawTicket />}
      <DayStreak
        year={ADVENT_YEAR}
        latestDay={getCurrentAdventDay()}
        completionDayLevel={member.completion_day_level}
      />
    </div>
  );
}

function LeaderboardRowStars({
  member,
  maxRank,
}: {
  member: RankedMember;
  maxRank: number;
}) {
  return (
    <LeaderboardRowTemplate member={member} maxRank={maxRank}>
      <span className="star-count">
        {`${member.stars}*`.padStart(4, ' ')}
        {TAB}
      </span>
    </LeaderboardRowTemplate>
  );
}

function LeaderboardRowScore({
  member,
  maxRank,
  maxScore,
}: {
  member: RankedMember;
  maxRank: number;
  maxScore: number;
}) {
  const getFormattedScore = (score: number, maxScore: number) => {
    const maxLength = maxScore.toString().length;
    return score.toString().padEnd(maxLength, ' ');
  };

  return (
    <LeaderboardRowTemplate member={member} maxRank={maxRank}>
      {' ' + getFormattedScore(member.local_score, maxScore) + ' '}
    </LeaderboardRowTemplate>
  );
}

export default Leaderboard;
