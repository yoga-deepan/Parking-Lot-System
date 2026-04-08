import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// API service methods
const apiService = {
  // Get available slots
  async getSlots() {
    try {
      const response = await api.get('/slots')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch slots')
    }
  },

  // Park a vehicle
  async parkVehicle(data) {
    try {
      const response = await api.post('/park', data)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to park vehicle')
    }
  },

  // Exit a vehicle
  async exitVehicle(ticketId) {
    try {
      const response = await api.post('/exit', { ticket_id: ticketId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to process exit')
    }
  }
}

export default apiService
