import { useState, useEffect } from 'react';
import './ViewReports.css';
import logo from '../assets/logo.svg';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.19:8024/IndianInvTally';

const voucherTypes = [
  "PV_WITH_INVENTORY",
  "PV_WITHOUT_INVENTORY",
  "DELIVERY_NOTE",
  "JOURNAL_VOUCHER",
  "BANK_STATEMENT",
  "RECEIPT_NOTE",
  "PURCHASE_ORDER"
];

const avTallySuccessStatuses = [
  'Success',
  'Skipped',
  'PartialSuccess',
  'Duplicate',
  'NOT_APPLICABLE',
  'ValidationError'
];

const ViewReports = ({ onBack }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date filters
  const [filterPreset, setFilterPreset] = useState('Today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // New filters
  const [selectedVoucherType, setSelectedVoucherType] = useState(''); // single select
  const [tallyPunchInStatus, setTallyPunchInStatus] = useState('None'); // 'Yes', 'No', 'None'
  const [selectedAVTallyStatus, setSelectedAVTallyStatus] = useState(''); // single select
  const [systemUserName, setSystemUserName] = useState(''); // for strSystemUserName

  const [searchTerm, setSearchTerm] = useState(''); // Keep general search for now, could remove if specific fields suffice

  // Define the columns to display and their user-friendly names
  const columns = [
    { key: 'RecievedDate', header: 'Date', render: (dateString) => formatDate(dateString, true) },
    { key: 'strClientREQID', header: 'Event/Request ID', render: (value) => value || 'N/A' },
    { key: 'strVoucherType', header: 'Voucher Type', render: (value) => value || 'N/A' },
    { key: 'ReqDocName', header: 'Document Name', render: (value) => value || 'N/A' },
    { key: 'strCustomerName', header: 'Customer', render: (value) => value || 'N/A' },
    { key: 'ClientImportedXMLStatusCode', header: 'Imported', render: (statusCode) => statusCode === '200' ? 'Yes' : 'No' },
    { key: 'AVXMLGeneratedStatus', header: 'Processing Status', render: (value) => value || 'N/A' },
    { key: 'strServerEstProcessingTime', header: 'Est. Processing Time', render: (value) => value || 'N/A' },
    // { key: 'tallySuccessFullyPunchIn', header: 'Tally Punched In', render: (value) => value ? 'Yes' : 'No' }, // Assuming your API returns a boolean
    { key: 'strSystemUserName', header: 'System User', render: (value) => value || 'N/A' },
  ];

  useEffect(() => {
    fetchReports();
  }, [filterPreset, customStartDate, customEndDate, selectedVoucherType, tallyPunchInStatus, selectedAVTallyStatus, systemUserName, searchTerm]);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      setLoading(false);
      return;
    }

    const params = new URLSearchParams();

    // Date filters
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    let startDateISO = null;
    let endDateISO = null;

    if (filterPreset === 'Today') {
      startDateISO = today.toISOString().split('T')[0];
      endDateISO = endDate.toISOString().split('T')[0];
    } else if (filterPreset === 'Yesterday') {
      today.setDate(today.getDate() - 1);
      endDate.setDate(endDate.getDate() - 1); // Ensure end date is also yesterday
      startDateISO = today.toISOString().split('T')[0];
      endDateISO = endDate.toISOString().split('T')[0];
    } else if (filterPreset === 'Last 7 Days') {
      today.setDate(today.getDate() - 7);
      startDateISO = today.toISOString().split('T')[0];
      endDateISO = endDate.toISOString().split('T')[0];
    } else if (filterPreset === 'Last 30 Days') {
      today.setDate(today.getDate() - 30);
      startDateISO = today.toISOString().split('T')[0];
      endDateISO = endDate.toISOString().split('T')[0];
    } else if (filterPreset === 'Custom') {
      // Use custom dates if provided
      if (customStartDate) params.append('start_date', customStartDate);
      if (customEndDate) params.append('end_date', customEndDate);
    }

    if (startDateISO) params.append('start_date', startDateISO);
    if (endDateISO) params.append('end_date', endDateISO);

    // Other filters
    if (selectedVoucherType) {
      params.append('strVoucherType', selectedVoucherType);
    }
    if (tallyPunchInStatus === 'Yes') {
      params.append('tallySuccessFullyPunchIn', 'true');
    } else if (tallyPunchInStatus === 'No') {
      params.append('tallySuccessFullyPunchIn', 'false');
    }
    // 'None' means don't pass the parameter

    if (selectedAVTallyStatus) {
      params.append('AVTallySuccessStatus', selectedAVTallyStatus);
    }
    if (systemUserName) {
      params.append('strSystemUserName', systemUserName);
    }
    if (searchTerm) {
      params.append('search', searchTerm); // Assuming your backend supports a general search parameter
    }

    const url = `${API_BASE_URL}/avrequests?${params.toString()}`;

    console.log("Fetching URL: ", url);
    console.log("Token: ", token);

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.APIStatusCode === 200) {
        setReports(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch reports with unknown status.');
      }
    } catch (err) {
      console.error('API call error:', err);
      if (err.response) {
        console.error('Error data:', err.response.data);
        setError(err.response.data.message || `Failed to fetch reports: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Please check your network connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
    try {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      if (includeTime) {
        // Adjusting for the format "May 3, 2025 at 06:30 AM"
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = true; // Use 12-hour clock with AM/PM
      }
      return new Date(dateString).toLocaleString('en-US', options);
    } catch (e) {
      console.error("Invalid date string:", dateString, e);
      return 'Invalid Date';
    }
  };

  const handleFilterPresetChange = (preset) => {
    setFilterPreset(preset);
    // Clear custom dates if a preset is selected
    if (preset !== 'Custom') {
      setCustomStartDate('');
      setCustomEndDate('');
    }
  };

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
        <div className="date-filters-group">
          <div className="date-presets">
            {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'ALL', 'Custom'].map(option => (
              <button
                key={option}
                className={`filter-btn ${filterPreset === option ? 'active' : ''}`}
                onClick={() => handleFilterPresetChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {filterPreset === 'Custom' && (
            <div className="custom-date-inputs">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
            </div>
          )}
          <span className="current-date-display">
            {new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })}
          </span>
        </div>

        <div className="additional-filters">
          <div className="filter-group">
            <label htmlFor="voucherType">Voucher Type:</label>
            <select
              id="voucherType"
              value={selectedVoucherType}
              onChange={(e) => setSelectedVoucherType(e.target.value)}
            >
              <option value="">All</option>
              {voucherTypes.map(type => (
                <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Tally Punched In:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="None"
                  checked={tallyPunchInStatus === 'None'}
                  onChange={(e) => setTallyPunchInStatus(e.target.value)}
                /> All
              </label>
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={tallyPunchInStatus === 'Yes'}
                  onChange={(e) => setTallyPunchInStatus(e.target.value)}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={tallyPunchInStatus === 'No'}
                  onChange={(e) => setTallyPunchInStatus(e.target.value)}
                /> No
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="avTallyStatus">Processing Status:</label>
            <select
              id="avTallyStatus"
              value={selectedAVTallyStatus}
              onChange={(e) => setSelectedAVTallyStatus(e.target.value)}
            >
              <option value="">All</option>
              {avTallySuccessStatuses.map(status => (
                <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="systemUserName">System User:</label>
            <input
              type="text"
              id="systemUserName"
              placeholder="Search by System User"
              value={systemUserName}
              onChange={(e) => setSystemUserName(e.target.value)}
            />
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search all..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon-btn">🔍</button>
          </div>
        </div>

        <button className="request-csv-btn">
          <span className="csv-icon">📊</span> Request CSV
        </button>
      </div>

      <div className="reports-table-container">
        {loading ? (
          <p>Loading reports...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : reports.length === 0 ? (
          <p className="no-data-message">No activity found for the selected criteria.</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}>{col.header}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.ID || index}>
                  {columns.map(col => (
                    <td key={`${report.ID || index}-${col.key}`}>
                      {col.render(report[col.key])}
                    </td>
                  ))}
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
        <div className="rows-per-page-selector">
          <label htmlFor="rowsPerPage">Rows per page:</label>
          <select
            id="rowsPerPage"
            value={10} // Hardcoded for now, you'd link this to state if implementing
            onChange={() => {}} // No-op as full pagination isn't implemented
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="All">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;