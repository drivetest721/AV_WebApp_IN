import './PowerBIDashboard.css'
import logo from '../assets/logo.svg'

const PowerBIDashboard = ({ onBack }) => {
  return (
    <div className="powerbi-container">
      <header className="powerbi-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">
            ← Back to Dashboard
          </button>
          <div className="logo">
            <img src={logo} alt="AccuVelocity Logo" className="logo-image" />
          </div>
        </div>
        <div className="header-right">
          <h1>PowerBI Analytics Dashboard</h1>
        </div>
      </header>

      <main className="powerbi-main">
        <div className="dashboard-wrapper">
        <iframe
            title="AVDashboard_V2"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/reportEmbed?reportId=7413c872-9832-46aa-bd2b-6d6df4d67011&autoAuth=true&ctid=aa0b3340-f8f9-4cd3-910f-f15bb43eeb6a"
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
