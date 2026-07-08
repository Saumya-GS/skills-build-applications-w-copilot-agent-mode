import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // TODO: Replace with actual API call once endpoints are implemented
        setTeams([
          { id: 1, name: 'Morning Runners', members: 8, activities: 42 },
          { id: 2, name: 'Gym Warriors', members: 15, activities: 127 },
          { id: 3, name: 'Cycling Enthusiasts', members: 5, activities: 38 },
        ]);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="container mt-5"><p>Loading teams...</p></div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Teams</h1>
        <button className="btn btn-primary">Create Team</button>
      </div>

      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <strong>Members:</strong> {team.members}<br />
                    <strong>Activities:</strong> {team.activities}
                  </p>
                  <button className="btn btn-sm btn-outline-primary w-100">
                    Join Team
                  </button>
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
}
