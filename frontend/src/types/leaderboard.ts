import { Nullable } from './utility';

export interface CompletionLevel {
  star_index: number;
  get_star_ts: number;
}

export type DayCompletion = {
  [part in DayPart]: CompletionLevel;
};

export type DayPart = '1' | '2';

export interface CompletionDayLevel {
  [day: string]: DayCompletion;
}

export interface Member {
  local_score: number;
  global_score: number;
  last_star_ts: number;
  name: Nullable<string>;
  completion_day_level: CompletionDayLevel;
  id: number;
  stars: number;
}

export interface Members {
  [id: string]: Member;
}

export interface LeaderboardData {
  members: Members;
  event: string;
  last_updated: string;
}
export interface LeaderboardListView {
  id: number;
  invite_code: string;
  size: number;
}
