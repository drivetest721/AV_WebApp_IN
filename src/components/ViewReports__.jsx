import { useState, useEffect } from 'react'
import './ViewReports.css'
import logo from '../assets/logo.svg'

const ViewReports = ({ onBack }) => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('Today')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch('http://192.168.1.19:8024/IndianInvTally/avrequests')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setReports(data.data)
      setLoading(false)
    } catch (error) {
      setError('Failed to fetch reports')
      setLoading(false)
    }
  }

  const filterReports = () => {
    let filteredReports = reports

    if (filter !== 'ALL') {
      const today = new Date()
      const filterDate = new Date()

      switch (filter) {
        case 'Today':
          filterDate.setDate(today.getDate() - 1)
          break
        case 'Yesterday':
          filterDate.setDate(today.getDate() - 2)
          break
        case 'Last 7 Days':
          filterDate.setDate(today.getDate() - 7)
          break
        case 'Last 30 Days':
          filterDate.setDate(today.getDate() - 30)
          break
      }

      filteredReports = filteredReports.filter(report => 
        new Date(report.RecievedDate) > filterDate
      )
    }

    if (searchTerm) {
      filteredReports = filteredReports.filter(report =>
        Object.values(report).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    return filteredReports
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="view-reports-container">
      <header className="reports-header">
        <div className="header-left">
          <img src={logo} alt="AccuVelocity Logo" className="logo" />
          <h1>Activity Log</h1>
        </div>
        <button onClick={onBack} className="back-btn">
          Back to Dashboard
        </button>
      </header>

      <div className="filter-section">
        <div className="date-filters">
          {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'ALL'].map(option => (
            <button
              key={option}
              className={`filter-btn ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="reports-table-container">
        {loading ? (
          <p>Loading reports...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Section</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {filterReports().map((report, index) => (
                <tr key={index}>
                  <td>{formatDate(report.RecievedDate)}</td>
                  <td>{report.strClientREQID}</td>
                  <td>{report.strVoucherType}</td>
                  <td>
                    <button className="review-btn">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button disabled>Previous</button>
        <span>Page 1 of 1</span>
        <button disabled>Next</button>
      </div>
    </div>
  )
}

export default ViewReports