import CompanyLogo from '../assets/CompanyLogo.svg'
import './PowerBIDashboard.css'

const PowerBIDashboard = ({ onBack }) => {
  return (
    <div className="powerbi-container">
      <header className="powerbi-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">
            ← Back to Dashboard
          </button>
          <div className="logo">
            <img src={CompanyLogo} alt="AccuVelocity Logo" className="logo-image" />
            <span className="logo-text">AccuVelocity</span>
          </div>
        </div>
        <div className="header-right">
          <h1>PowerBI Analytics Dashboard</h1>
        </div>
      </header>

      <main className="powerbi-main">
        <div className="dashboard-wrapper">
        <iframe
            title="AVDashboard_V3.3"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/reportEmbed?reportId=c56d34f3-cdc0-4f01-b5f2-ceedfa7922bb&autoAuth=true&ctid=aa0b3340-f8f9-4cd3-910f-f15bb43eeb6a"
            frameBorder="0"
            allowFullScreen="true"
            className="powerbi-iframe"
          />
        </div>
      </main>
    </div>
  )
}

export default PowerBIDashboard
