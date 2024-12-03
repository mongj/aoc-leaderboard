import { Nullable } from './utility';

export interface CompletionLevel {
  star_index: number;
  get_star_ts: number;
}

export interface DayCompletion {
  '1'?: CompletionLevel;
  '2'?: CompletionLevel;
}

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
  owner_id: number;
  members: Members;
  event: string;
}
