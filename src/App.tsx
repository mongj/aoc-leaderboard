import { DayStreak, LuckyDrawTicket } from "./components/Award"
import Header from "./components/Header"

const completionDayLevel = {
  "1": {
    "2": {
      "star_index": 8759,
      "get_star_ts": 1733030397
    },
    "1": {
      "star_index": 7901,
      "get_star_ts": 1733030253
    }
  },
  "3": {
    "2": {
      "get_star_ts": 1733202604,
      "star_index": 526593
    },
    "1": {
      "get_star_ts": 1733202204,
      "star_index": 521704
    }
  },
  "2": {
    "2": {
      "star_index": 225626,
      "get_star_ts": 1733116602
    },
    "1": {
      "star_index": 222735,
      "get_star_ts": 1733116339
    }
  }
};


function App() {
  return (
    <body>
      <Header />
      <main>
        <article>
          <p>This is the private leaderboard of Jun Yu for <em>Advent of Code 2024</em>.</p>
            <ul>
              <li><a href="?order=local_score">[Local Score]</a>, which awards users on this leaderboard points much like the global leaderboard. If you add or remove users, the points will be recalculated, and the order can change. For <code>N</code> users, the first user to get each star gets <code>N</code> points, the second gets <code>N-1</code>, and the last gets <code>1</code>. This is the default.</li>
              <li><a href="?order=global_score">[Global Score]</a>, which uses scores from the global leaderboard. Ties are broken by the user's local score.</li>
              <li><a href="?order=stars">[Stars]</a>, which uses the number of stars the user has. Ties are broken by the time the most recent star was acquired. This used to be the default.</li>
            </ul>
          <p><span className="privboard-star-both">Gold</span> indicates the user got both stars for that day, <span className="privboard-star-firstonly">silver</span> means just the first star, and <span className="privboard-star-unlocked">gray</span> means none.</p>
        <div className="privboard-row">
          <span className="privboard-days">
            <a href="/2024/day/1">1</a>
            <a href="/2024/day/2">2</a>
            <a href="/2024/day/3">3</a>
              <span>4</span>
              <span>5</span>
          </span>
        </div>
        <div className="privboard-row"><span className="privboard-position">{`1)`}</span> 21 <span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span>  <span className="privboard-name">Ming Jun</span> <LuckyDrawTicket/> <DayStreak year={2024}latestDay={3} completionDayLevel={completionDayLevel}/></div>
        <div className="privboard-row"><span className="privboard-position">{`2)`}</span> 17 <span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span>  <span className="privboard-name">Jun Yu</span></div>
        <div className="privboard-row"><span className="privboard-position">{`3)`}</span> 13 <span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span>  <span className="privboard-name">Lucas</span></div>
        <div className="privboard-row"><span className="privboard-position">{`4)`}</span>  7 <span className="privboard-star-both">*</span><span className="privboard-star-both">*</span><span className="privboard-star-unlocked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span><span className="privboard-star-locked">*</span>  <span className="privboard-name"><a href="https://github.com/riccoljy" target="_blank">riccoljy</a></span></div>
      </article>
      </main>
    </body>
  )
}

export default App
