import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalDistance: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API call once endpoints are implemented
        setStats({
          totalActivities: 12,
          totalDistance: 45.5,
          currentStreak: 7,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="container mt-5"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Activities</h5>
              <p className="display-6">{stats.totalActivities}</p>
              <p className="text-muted">activities completed</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Distance</h5>
              <p className="display-6">{stats.totalDistance} km</p>
              <p className="text-muted">distance traveled</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Current Streak</h5>
              <p className="display-6">{stats.currentStreak} 🔥</p>
              <p className="text-muted">days in a row</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5>Recent Activities</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">No activities recorded yet. Start logging your workouts!</p>
              <button className="btn btn-primary">Log Activity</button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5>Team Information</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">You are not part of a team yet.</p>
              <button className="btn btn-outline-primary w-100">Join or Create Team</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
