import { useEffect, useState } from 'react';

const Teams = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams`
    : `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/teams`;

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (Array.isArray(json)) setTeams(json);
        else if (json.items && Array.isArray(json.items)) setTeams(json.items);
        else if (json.data && Array.isArray(json.data)) setTeams(json.data);
        else setTeams([]);
      } catch (err) {
        console.error('Failed to load teams', err);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [endpoint]);

  if (loading) return <p>Loading teams...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Teams</h1>
      </div>

      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <strong>Members:</strong> {team.members?.length ?? 0}<br />
                    <strong>Activities:</strong> {team.totalActivities ?? 0}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">No teams available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
