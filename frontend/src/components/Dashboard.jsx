import { useState, useEffect } from 'react'
import api from '../services/api'

function Dashboard() {
  const [slots, setSlots] = useState({ Bike: 0, Car: 0, Truck: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSlots = async () => {
    try {
      setError(null)
      const data = await api.getSlots()
      setSlots(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots()
    
    // Auto refresh every 10 seconds
    const interval = setInterval(fetchSlots, 10000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading slots...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error">❌ {error}</p>
        <button onClick={fetchSlots} className="btn-retry">Retry</button>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h2>Available Parking Slots</h2>
      <p className="refresh-info">Auto-refreshes every 10 seconds</p>
      
      <div className="slots-grid">
        <div className="slot-card bike">
          <div className="slot-icon">🏍️</div>
          <h3>Bike</h3>
          <div className="slot-count">{slots.Bike}</div>
          <p>Available Slots</p>
          <div className="slot-total">Total: 5</div>
        </div>

        <div className="slot-card car">
          <div className="slot-icon">🚗</div>
          <h3>Car</h3>
          <div className="slot-count">{slots.Car}</div>
          <p>Available Slots</p>
          <div className="slot-total">Total: 5</div>
        </div>

        <div className="slot-card truck">
          <div className="slot-icon">🚚</div>
          <h3>Truck</h3>
          <div className="slot-count">{slots.Truck}</div>
          <p>Available Slots</p>
          <div className="slot-total">Total: 2</div>
        </div>
      </div>

      <div className="pricing-info">
        <h3>💰 Pricing Information</h3>
        <table>
          <thead>
            <tr>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to 3 hours</td>
              <td>₹30</td>
            </tr>
            <tr>
              <td>3 - 6 hours</td>
              <td>₹85</td>
            </tr>
            <tr>
              <td>Above 6 hours</td>
              <td>₹120</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
