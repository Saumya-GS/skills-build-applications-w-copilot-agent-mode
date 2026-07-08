import { useEffect, useState } from 'react';

const Activities = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/activities`;

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const json = await res.json();

        // Accept arrays or paginated responses
        if (Array.isArray(json)) setActivities(json);
        else if (json.items && Array.isArray(json.items)) setActivities(json.items);
        else if (json.data && Array.isArray(json.data)) setActivities(json.data);
        else setActivities([]);
      } catch (err) {
        console.error('Failed to load activities', err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [endpoint]);

  if (loading) return <p>Loading activities...</p>;

  return (
    <div>
      <h3>Recent Activities</h3>
      {activities.length === 0 ? (
        <p className="text-muted">No activities yet.</p>
      ) : (
        <ul className="list-group">
          {activities.map((a) => (
            <li key={a._id || a.id || Math.random()} className="list-group-item">
              <strong>{a.type}</strong> — {a.distance ?? 0} km • {a.duration ?? 0} min
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;
