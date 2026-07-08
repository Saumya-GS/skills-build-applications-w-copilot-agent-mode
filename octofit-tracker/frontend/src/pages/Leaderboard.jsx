import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // TODO: Replace with actual API call once endpoints are implemented
        setLeaderboard([
          { rank: 1, name: 'Alice Johnson', activities: 156, distance: 542.3, points: 1560 },
          { rank: 2, name: 'Bob Smith', activities: 142, distance: 498.7, points: 1420 },
          { rank: 3, name: 'Carol Davis', activities: 138, distance: 476.2, points: 1380 },
          { rank: 4, name: 'Diana Wilson', activities: 125, distance: 445.8, points: 1250 },
          { rank: 5, name: 'Eve Martinez', activities: 118, distance: 412.5, points: 1180 },
        ]);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="container mt-5"><p>Loading leaderboard...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">🏆 Leaderboard</h1>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Activities</th>
              <th>Distance (km)</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.rank} className={entry.rank === 1 ? 'table-success' : ''}>
                <td>
                  <strong>
                    {entry.rank === 1 && '🥇'}
                    {entry.rank === 2 && '🥈'}
                    {entry.rank === 3 && '🥉'}
                    {entry.rank > 3 && '#'}
                    {entry.rank}
                  </strong>
                </td>
                <td>{entry.name}</td>
                <td>{entry.activities}</td>
                <td>{entry.distance.toFixed(1)}</td>
                <td><strong>{entry.points}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
