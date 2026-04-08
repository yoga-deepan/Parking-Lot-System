import { useState } from 'react'
import api from '../services/api'

function ParkVehicle() {
  const [formData, setFormData] = useState({
    vehicle_number: '',
    vehicle_type: 'Car'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await api.parkVehicle(formData)
      setResult(data)
      setFormData({ vehicle_number: '', vehicle_type: 'Car' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="park-vehicle">
      <h2>🅿️ Park a Vehicle</h2>
      
      <form onSubmit={handleSubmit} className="park-form">
        <div className="form-group">
          <label htmlFor="vehicle_number">Vehicle Number</label>
          <input
            type="text"
            id="vehicle_number"
            name="vehicle_number"
            value={formData.vehicle_number}
            onChange={handleChange}
            placeholder="e.g., TN01AB1234"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicle_type">Vehicle Type</label>
          <select
            id="vehicle_type"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            required
          >
            <option value="Bike">🏍️ Bike</option>
            <option value="Car">🚗 Car</option>
            <option value="Truck">🚚 Truck</option>
          </select>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (
            <>
              <span className="btn-spinner"></span>
              Parking...
            </>
          ) : (
            'Park Vehicle'
          )}
        </button>
      </form>

      {error && (
        <div className="message error">
          <p>❌ {error}</p>
        </div>
      )}

      {result && (
        <div className="message success">
          <h3>🎉 {result.message}</h3>
          <div className="ticket-info">
            <p><strong>🎫 Your Ticket ID:</strong></p>
            <code className="ticket-id">{result.ticket_id}</code>
            <p className="note">⚠️ Please save this ticket ID for exit. You'll need it to calculate charges.</p>
            <div className="vehicle-details">
              <p>📝 <strong>Vehicle Number:</strong> {result.vehicle_number}</p>
              <p>🚗 <strong>Vehicle Type:</strong> {result.vehicle_type}</p>
              <p>⏰ <strong>Entry Time:</strong> {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParkVehicle
