import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import { useState } from 'react';
import LeaderboardList from './components/LeaderboardList';

function App() {
  const [showOrdering, setShowOrdering] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  const handleShowOrdering = () => {
    setShowOrdering(!showOrdering);
  };
  const handleShowBadges = () => {
    setShowBadges(!showBadges);
  };

  return (
    <>
      <Header />
      <main>
        <article>
          <p>
            This is the private leaderboard of{' '}
            <a href="https://nushackers.org" target="_blank">
              NUS Hackers{' '}
            </a>
            for <em>Advent of Code 2024</em>. It aggregates the private AOC
            leaderboards used by NUS Hackers, and is updated once every 15
            minutes.
          </p>
          <LeaderboardList />
          <p>
            You can also join our{' '}
            <a href="https://discord.gg/Ub4W6bNRch" target="_blank">
              Discord
            </a>{' '}
            to learn more about Advent of Code, talk about the problems, and
            share your solutions with other members!
          </p>
          <hr />
          <p>
            You may use a different{' '}
            <a onClick={handleShowOrdering}>[Ordering]</a> method to view the
            leaderboard. You can also check out the cool new{' '}
            <a onClick={handleShowBadges}>[Badges]</a> we added!
          </p>
          {showOrdering && (
            <section>
              <p>The following ordering methods are available:</p>
              <ul>
                <li>
                  <a href="?order=stars">[Stars]</a>, which uses the number of
                  stars the user has. Ties are broken by the time the most
                  recent star was acquired. This is the default for this
                  leaderboard.
                </li>
                <li>
                  <a href="?order=local_score">[Local Score]</a>, which awards
                  users on this leaderboard points much like the global
                  leaderboard. If you add or remove users, the points will be
                  recalculated, and the order can change. For <code>N</code>{' '}
                  users, the first user to get each star gets <code>N</code>{' '}
                  points, the second gets <code>N-1</code>, and the last gets{' '}
                  <code>1</code>.
                </li>
                {/* Temporarily hide global sorter as it is not formatted and not important */}
                {/* <li>
              <a href="?order=global_score">[Global Score]</a>, which uses
              scores from the global leaderboard. Ties are broken by the user's
              local score.
            </li> */}
              </ul>{' '}
            </section>
          )}
          {showBadges && (
            <section>
              <p>We also added the following cool badges!</p>
              <ul>
                <li>
                  A <span className="star-count">ticket</span> 🎫 to enter the
                  NUS Hackers Lucky Draw - which you can obtain by getting{' '}
                  <span className="star-count">20 stars</span>! We will be
                  giving away prizes to 15 lucky winners!
                </li>
                <li>
                  A Day Streak 🔥 counter - which records your current streak of
                  solving both parts within 24 hours! You need to get at least 2
                  consecutive days for the streak counter to appear!
                </li>
              </ul>
            </section>
          )}
          <p>
            <span className="privboard-star-both">Gold</span> indicates the user
            got both stars for that day,{' '}
            <span className="privboard-star-firstonly">silver</span> means just
            the first star, and{' '}
            <span className="privboard-star-unlocked">gray</span> means none.
          </p>
          <Leaderboard />
        </article>
      </main>
    </>
  );
}

export default App;
