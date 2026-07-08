import { useEffect, useState } from 'react';

const Workouts = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;
  const base = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      setLoading(true);
      try {
        const res = await fetch(`${base}/workouts`);
        const json = await res.json();
        if (Array.isArray(json)) setWorkouts(json);
        else if (json.items && Array.isArray(json.items)) setWorkouts(json.items);
        else if (json.data && Array.isArray(json.data)) setWorkouts(json.data);
        else setWorkouts([]);
      } catch (err) {
        console.error('Failed to load workouts', err);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, [base]);

  if (loading) return <p>Loading workouts...</p>;

  return (
    <div>
      <h1>Workouts</h1>
      <ul className="list-group">
        {workouts.map((w) => (
          <li key={w._id || w.id} className="list-group-item">
            {w.name} — {w.type} ({w.intensity}) on {new Date(w.scheduledAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
