import Header from './components/Header';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <body>
      <Header />
      <main>
        <article>
          <p>
            This is the private leaderboard of NUS Hackers for{' '}
            <em>Advent of Code 2024</em>.
          </p>
          <p>
            You may use a different ordering method to view the leaderboard. The
            following ordering methods are available:
          </p>
          <ul>
            <li>
              <a href="?order=stars">[Stars]</a>, which uses the number of stars
              the user has. Ties are broken by the time the most recent star was
              acquired. This is the default for this leaderboard.
            </li>
            <li>
              <a href="?order=local_score">[Local Score]</a>, which awards users
              on this leaderboard points much like the global leaderboard. If
              you add or remove users, the points will be recalculated, and the
              order can change. For <code>N</code> users, the first user to get
              each star gets <code>N</code> points, the second gets{' '}
              <code>N-1</code>, and the last gets <code>1</code>.
            </li>
            {/* Temporarily hide global sorter as it is not formatted and not important */}
            {/* <li>
              <a href="?order=global_score">[Global Score]</a>, which uses
              scores from the global leaderboard. Ties are broken by the user's
              local score.
            </li> */}
          </ul>
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
    </body>
  );
}

export default App;
