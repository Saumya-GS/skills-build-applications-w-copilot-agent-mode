import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 mb-4">Welcome to Octofit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness activities, build teams, and compete on the leaderboard!
          </p>
          
          <div className="row mb-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">📊 Activity Tracking</h5>
                  <p className="card-text">Log and track your workout activities in real-time</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">👥 Teams</h5>
                  <p className="card-text">Create teams and collaborate with other fitness enthusiasts</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏆 Leaderboard</h5>
                  <p className="card-text">Compete and climb the competitive leaderboard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/dashboard" className="btn btn-primary btn-lg px-4 gap-3">
              Get Started
            </Link>
            <Link to="/teams" className="btn btn-outline-secondary btn-lg px-4">
              Browse Teams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
