interface AwardProps {
    titleText: string;
    content: string;
}

const Award = ({ titleText, content }: AwardProps) => {
    return (
        <span className="share">[{titleText}<span className="share-content">{content}</span>]</span>
    );
}

const LuckyDrawTicket = () => {
    return (
        <Award titleText="🎫" content="- 20 Stars Achieved - Lucky Draw Ticket Obtained! 🎉" />
    )
}

interface DayStreakProps {
    year: number;
    latestDay: number;
    completionDayLevel: {
        [day: string]: {
            [level: string]: {
                star_index: number;
                get_star_ts: number;
            };
        };
    };
}

function isSolvedWithinDay(aocYear: number, aocDay: number, secondStarTimestamp: number) {
    // Releases are at 5am UTC or midnight EST or 1pm SGT
    // No AOC before 2015

    // Check if the second star was obtained before 5am UTC the next day
    return secondStarTimestamp < Date.UTC(aocYear, 11, aocDay + 1, 5, 0, 0, 0);
}

const DayStreak = ({ year, latestDay, completionDayLevel }: DayStreakProps) => {
    const completedRecord: number[] = Array<number>(latestDay).fill(0);;

    for (let day = 1; day <= latestDay; day++) {
        if (!completionDayLevel[day]) {  // Member has not completed this day
            continue;
        }
        const dayLevels = completionDayLevel[day];

        if (!dayLevels['2']) {  // Member has not completed the second star for this day
            continue;
        }
        const secondStarLevel = dayLevels['2'];

        if (isSolvedWithinDay(year, day, secondStarLevel.get_star_ts)) {
            completedRecord[day - 1] = 1;
        }
    }

    // Ignore latest day since the streak is not broken yet until the next day
    var currentStreak = completedRecord.slice(0, latestDay - 1).reduce((maxStreak, currentStreak) => {
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

    return (
        <Award titleText="🔥" content={`${currentStreak} Day Streak!`}  />
    )
}

export { Award, LuckyDrawTicket, DayStreak };
