import { CompletionDayLevel } from './leaderboard';

export interface BadgeProps {
    titleText: string;
    content: string;
}

export interface DayStreakProps {
    year: number;
    latestDay: number;
    completionDayLevel: CompletionDayLevel;
}
