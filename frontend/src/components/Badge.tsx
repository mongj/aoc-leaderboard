import { BadgeProps, DayStreakProps } from '../types/badge';
import isSolvedWithinDay from '../util/solvedWithinDay';

const Award = ({ titleText, content }: BadgeProps) => {
  return (
    <span className="share">
      [{titleText}
      <span className="share-content">{content}</span>]
    </span>
  );
};

const LuckyDrawTicket = () => {
  return (
    <span className="share">
      [
      <svg
        style={{ marginBottom: '-3.8' }}
        width="18px"
        height="18px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="m29 14a1 1 0 0 0 1-1v-5a2 2 0 0 0 -2-2h-24a2 2 0 0 0 -2 2v5a1 1 0 0 0 1 1 2 2 0 0 1 0 4 1 1 0 0 0 -1 1v5a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2v-5a1 1 0 0 0 -1-1 2 2 0 0 1 0-4zm-1 5.87v4.13h-7v-3h-2v3h-15v-4.13a4 4 0 0 0 0-7.74v-4.13h15v3h2v-3h7v4.13a4 4 0 0 0 0 7.74z"
        />
        <path fill="currentColor" d="m19 13h2v6h-2z" />
        <path d="m0 0h32v32h-32z" fill="none" />
      </svg>
      <span className="share-content">
        - 20 Stars Achieved - 🎫 Lucky Draw Ticket Obtained!
      </span>
      ]
    </span>
  );
};

const DayStreak = ({ year, latestDay, completionDayLevel }: DayStreakProps) => {
  const completedRecord: number[] = Array<number>(latestDay).fill(0);

  for (let day = 1; day <= latestDay; day++) {
    if (!completionDayLevel[day]) {
      // Member has not completed this day
      continue;
    }
    const dayLevels = completionDayLevel[day];

    if (!dayLevels['2']) {
      // Member has not completed the second star for this day
      continue;
    }
    const secondStarLevel = dayLevels['2'];

    if (isSolvedWithinDay(year, day, secondStarLevel.get_star_ts)) {
      completedRecord[day - 1] = 1;
    }
  }

  // Ignore latest day since the streak is not broken yet until the next day
  var currentStreak = completedRecord
    .slice(0, latestDay - 1)
    .reduce((maxStreak, currentStreak) => {
      if (currentStreak === 1) {
        maxStreak++;
      } else {
        maxStreak = 0;
      }
      return maxStreak;
    }, 0);

  // But if the latest day is completed, increment the streak
  if (completedRecord[latestDay - 1] === 1) {
    currentStreak++;
  }

  return currentStreak > 0 ? (
    <Award titleText={`🔥${currentStreak}`} content="Day Streak!" />
  ) : null;
};

export { Award, LuckyDrawTicket, DayStreak };
