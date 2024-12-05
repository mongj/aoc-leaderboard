import { Member, DayCompletion, DayPart } from '../types/leaderboard';

function sortByLocalScore(members: Member[], day: number): Member[] {
  // reset all local scores
  for (const member of members) {
    member.local_score = 0;
  }

  const dayCompletion: DayCompletion = {
    '1': { star_index: 1, get_star_ts: 0 },
    '2': { star_index: 2, get_star_ts: 0 },
  };

  // iterate through each day
  for (let d = 1; d <= day; d++) {
    // iterate through each star
    for (const key of Object.keys(dayCompletion) as DayPart[]) {
      members.sort((a, b) => {
        const aStarTS = a.completion_day_level[String(d)]?.[key]?.get_star_ts;
        const bStarTS = b.completion_day_level[String(d)]?.[key]?.get_star_ts;
        const aStarIndex = a.completion_day_level[String(d)]?.[key]?.star_index;
        const bStarIndex = b.completion_day_level[String(d)]?.[key]?.star_index;
        if (aStarTS && bStarTS) {
          if (aStarTS === bStarTS && aStarIndex && bStarIndex) {
            return aStarIndex - bStarIndex;
          }
          return aStarTS - bStarTS;
        } else if (aStarTS) {
          return -1;
        } else if (bStarTS) {
          return 1;
        } else {
          // only if both have not solved yet
          return 0;
        }
      });

      for (let i = 0; i < members.length; i++) {
        if (members[i].completion_day_level[String(d)]?.[key]?.get_star_ts) {
          members[i].local_score += members.length - i;
        } else {
          break;
        }
      }
    }
  }

  return Object.values(members).sort((a, b) => b.local_score - a.local_score);
}

function sortByStars(members: Member[], day: number): Member[] {
  const dayCompletion: DayCompletion = {
    '1': { star_index: 1, get_star_ts: 0 },
    '2': { star_index: 2, get_star_ts: 0 },
  };

  // Compare timestamp of the most recent star released to tiebreak for stars
  function compareStars(a: Member, b: Member) {
    // Loop through from the most recent day to the first day
    for (let d = day; d >= 1; d--) {
      // Loop through from the second star to the first star
      for (const key of Object.keys(dayCompletion).reverse() as DayPart[]) {
        const aStarTS = a.completion_day_level[String(d)]?.[key]?.get_star_ts;
        const bStarTS = b.completion_day_level[String(d)]?.[key]?.get_star_ts;
        const aStarIndex = a.completion_day_level[String(d)]?.[key]?.star_index;
        const bStarIndex = b.completion_day_level[String(d)]?.[key]?.star_index;

        if (aStarTS && bStarTS) {
          if (aStarTS === bStarTS && aStarIndex && bStarIndex) {
            return aStarIndex - bStarIndex;
          }
          return aStarTS - bStarTS;
        } else if (aStarTS) {
          return -1;
        } else if (bStarTS) {
          return 1;
        } else {
          // only if both have not solved yet, continue to the next previous star
          continue;
        }
      }
    }
    return 0;
  }

  return Object.values(members).sort((a, b) => {
    if (a.stars !== b.stars) {
      return b.stars - a.stars;
    } else {
      return compareStars(a, b);
    }
  });
}

export { sortByLocalScore, sortByStars };
