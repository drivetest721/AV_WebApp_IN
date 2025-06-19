import { useState, useEffect } from 'react'
import './ViewReports.css'

const ViewReports = ({ onBack }) => {
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    fetchReports()
  }, [])

  useEffect(() => {
    filterReports()
  }, [reports, searchTerm, dateFilter])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://192.168.1.19:8024/IndianInvTally/avrequests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (response.ok && data.APIStatusCode === 200) {
        setReports(data.data || [])
      } else {
        setError('Failed to fetch reports')
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
      console.error('Fetch reports error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterReports = () => {
    let filtered = [...reports]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.strClientREQID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.ReqDocName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.strCustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.strSystemUserName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Date filter
    if (dateFilter !== 'ALL') {
      const today = new Date()
      const filterDate = new Date()

      switch (dateFilter) {
        case 'Today':
          filterDate.setHours(0, 0, 0, 0)
          filtered = filtered.filter(report => {
            const reportDate = new Date(report.CReqGeneratedTimeAt)
            return reportDate >= filterDate
          })
          break
        case 'Yesterday':
          filterDate.setDate(today.getDate() - 1)
          filterDate.setHours(0, 0, 0, 0)
          const yesterdayEnd = new Date(filterDate)
          yesterdayEnd.setHours(23, 59, 59, 999)
          filtered = filtered.filter(report => {
            const reportDate = new Date(report.CReqGeneratedTimeAt)
            return reportDate >= filterDate && reportDate <= yesterdayEnd
          })
          break
        case 'Last 7 Days':
          filterDate.setDate(today.getDate() - 7)
          filtered = filtered.filter(report => {
            const reportDate = new Date(report.CReqGeneratedTimeAt)
            return reportDate >= filterDate
          })
          break
        case 'Last 30 Days':
          filterDate.setDate(today.getDate() - 30)
          filtered = filtered.filter(report => {
            const reportDate = new Date(report.CReqGeneratedTimeAt)
            return reportDate >= filterDate
          })
          break
      }
    }

    setFilteredReports(filtered)
    setCurrentPage(1)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatStatus = (status) => {
    return status?.replace(/_/g, ' ') || 'N/A'
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredReports.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="reports-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="reports-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Error Loading Reports</h2>
          <p>{error}</p>
          <button onClick={fetchReports} className="retry-btn">
            Try Again
          </button>
          <button onClick={onBack} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="reports-container">
      <header className="reports-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>Activity Log</h1>
        </div>
        <div className="header-right">
          <button className="export-btn">
            📊 Request CSV
          </button>
        </div>
      </header>

      <div className="reports-content">
        <div className="filters-section">
          <div className="date-filters">
            {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'ALL'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${dateFilter === filter ? 'active' : ''}`}
                onClick={() => setDateFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="search-section">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="table-section">
          <div className="table-header">
            <div className="table-info">
              <span>Showing {getCurrentPageData().length} of {filteredReports.length} results</span>
            </div>
            <div className="pagination-controls">
              <select 
                value={itemsPerPage} 
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="items-per-page"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>ALL</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Date ↕</th>
                  <th>Event ↕</th>
                  <th>Customer</th>
                  <th>Document</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((report, index) => (
                  <tr key={report.ID || index}>
                    <td>
                      <div className="date-cell">
                        <div className="date-time">
                          {formatDate(report.CReqGeneratedTimeAt)}
                        </div>
                        <div className="date-sub">
                          {new Date(report.RecievedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="event-cell">
                        Document processed: {report.ReqDocName}
                      </div>
                    </td>
                    <td>
                      <div className="customer-cell">
                        {report.strCustomerName}
                      </div>
                    </td>
                    <td>
                      <div className="document-cell">
                        <div className="doc-name">{report.ReqDocName}</div>
                        <div className="doc-type">{report.ReqDocType}</div>
                      </div>
                    </td>
                    <td>
                      <div className={`status-cell ${report.AVXMLGeneratedStatus?.toLowerCase()}`}>
                        {formatStatus(report.AVXMLGeneratedStatus)}
                      </div>
                    </td>
                    <td>
                      <div className="user-cell">
                        👤 {report.strSystemUserName}
                      </div>
                    </td>
                    <td>
                      <button className="review-btn">
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ←
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                )
              })}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewReports
