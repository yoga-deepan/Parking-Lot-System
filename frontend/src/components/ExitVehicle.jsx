import { useState } from 'react'
import api from '../services/api'

function ExitVehicle() {
  const [ticketId, setTicketId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await api.exitVehicle(ticketId)
      setResult(data)
      setTicketId('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="exit-vehicle">
      <h2>🚪 Exit Vehicle</h2>
      
      <form onSubmit={handleSubmit} className="exit-form">
        <div className="form-group">
          <label htmlFor="ticket_id">Ticket ID</label>
          <input
            type="text"
            id="ticket_id"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter your ticket ID"
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (
            <>
              <span className="btn-spinner"></span>
              Processing...
            </>
          ) : (
            'Exit & Calculate'
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
          <h3>✅ {result.message}</h3>
          <div className="payment-info">
            <div className="payment-card">
              <h4>💳 Payment Receipt</h4>
              <div className="detail-row">
                <span>🚗 Vehicle Number:</span>
                <strong>{result.vehicle_number}</strong>
              </div>
              <div className="detail-row">
                <span>🚙 Vehicle Type:</span>
                <strong>{result.vehicle_type}</strong>
              </div>
              <div className="detail-row">
                <span>⏱️ Parking Duration:</span>
                <strong>{result.hours} hour{result.hours !== 1 ? 's' : ''}</strong>
              </div>
              <div className="detail-row total">
                <span>💰 Total Amount:</span>
                <strong className="amount">₹{result.amount}</strong>
              </div>
            </div>
            <p className="thank-you">Thank you for using our parking service! Have a safe journey! 🙏</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExitVehicle
