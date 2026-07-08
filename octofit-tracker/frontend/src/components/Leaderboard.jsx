import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    : `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/leaderboard`;

  const [data, setData] = useState({ users: [], teams: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const json = await res.json();

        // Accept direct object or nested data
        const users = json.users || json.data?.users || [];
        const teams = json.teams || json.data?.teams || [];
        setData({ users, teams });
      } catch (err) {
        console.error('Failed to load leaderboard', err);
        setData({ users: [], teams: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [endpoint]);

  if (loading) return <p>Loading leaderboard...</p>;

  return (
    <div>
      <h1 className="mb-4">🏆 Leaderboard</h1>

      <div className="row">
        <div className="col-md-6">
          <h5>Top Users</h5>
          <ul className="list-group">
            {data.users.map((u, i) => (
              <li key={u._id || u.id || i} className="list-group-item">
                {i + 1}. {u.name} — {u.points ?? u.totalActivities ?? 0} pts
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h5>Top Teams</h5>
          <ul className="list-group">
            {data.teams.map((t, i) => (
              <li key={t._id || t.id || i} className="list-group-item">
                {i + 1}. {t.name} — {t.points ?? 0} pts
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
