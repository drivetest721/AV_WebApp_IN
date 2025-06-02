import { useState } from 'react'
import PowerBIDashboard from './PowerBIDashboard'
import './Dashboard.css'
import ViewReports from './fetchReport.jsx'
import logo from '../assets/logo.svg'



const Dashboard = ({ user, onLogout }) => {
  const [showPowerBI, setShowPowerBI] = useState(false)
  const [showReports, setShowReports] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_data')
    onLogout()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (showPowerBI) {
    return <PowerBIDashboard onBack={() => setShowPowerBI(false)} />
  }

  if (showReports) {
    return <ViewReports onBack={() => setShowReports(false)} />
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <img src={logo} alt="AccuVelocity Logo" className="logo-image" />
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">Welcome, {user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="welcome-section">
            <h1>Welcome to AccuVelocity Dashboard</h1>
          </div>

          <div className="user-details-card">
            <h2>User Information</h2>
            <div className="user-details-grid">
              <div className="detail-item">
                <label>Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="detail-item">
                <label>Member Since:</label>
                <span>{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="actions-section">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button 
                onClick={() => setShowPowerBI(true)}
                className="action-btn primary"
              >
                📊 View Dashboard
              </button>
              {/* <button 
                onClick={() => setShowReports(true)}
                className="action-btn secondary"
              >
                📈 View Reports
              </button> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
