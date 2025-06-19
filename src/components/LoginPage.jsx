import { useState } from 'react'
import CompanyLogo from '../assets/CompanyLogo.svg'
import './LoginPage.css'

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    workEmail: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!formData.workEmail || !formData.password) {
      setError('Email and Password are required.')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Use static dummy data instead of API call
      const data = {
        jwt_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibWFpbEBhYmhpbmF2aW5mcmFidWlsZC5jb20iLCJyb2xlIjoiR2VuZXJhbCIsIm5hbWUiOiJBYmhpbmF2IEluZnJhYnVpbGQiLCJleHAiOjE3NTE0NjcxODh9.U5rBdAGjIfbDF8P8PFtp9oZVqUIVq7cB_Ke7oG9ig5E",
        role: "General",
        uid: 11,
        email: "mail@abhinavinfrabuild.com",
        name: "Abhinav Infrabuild",
        created_at: "2025-04-03T21:29:48"
      }

      // Store JWT token in localStorage
      localStorage.setItem('jwt_token', data.jwt_token)
      localStorage.setItem('user_data', JSON.stringify({
        uid: data.uid,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: data.created_at
      }))

      // Call the onLogin callback with user data
      onLogin(data)
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container-center">
      <div className="login-card">
        <div className="logo-section">
          <img src={CompanyLogo} alt="AccuVelocity" className="logo-image" />
          <span className="logo-text">AccuVelocity</span>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="workEmail">Work Email*</label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              placeholder="you@accuvelocity.com"
              value={formData.workEmail}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage