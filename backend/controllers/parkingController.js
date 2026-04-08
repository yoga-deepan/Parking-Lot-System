const { v4: uuidv4 } = require('uuid');
const ParkingModel = require('../models/parkingModel');

// Parking slot capacity configuration
const SLOT_CAPACITY = {
  Bike: 5,
  Car: 5,
  Truck: 2
};

/**
 * Calculate parking charges based on duration
 * Pricing: 0-3hrs: ₹30, 3-6hrs: ₹85, 6+hrs: ₹120
 * @param {number} hours - Parking duration in hours
 * @returns {number} - Parking charge amount
 */
const calculateCharges = (hours) => {
  if (hours <= 3) return 30;
  if (hours <= 6) return 85;
  return 120;
};

/**
 * Calculate hours difference between entry and exit time
 * Always rounds up to nearest hour
 * @param {Date} entryTime - Vehicle entry timestamp
 * @param {Date} exitTime - Vehicle exit timestamp
 * @returns {number} - Duration in hours (rounded up)
 */
const calculateHours = (entryTime, exitTime) => {
  const diff = exitTime - entryTime;
  const hours = Math.ceil(diff / (1000 * 60 * 60)); // Convert ms to hours and round up
  return hours;
};

class ParkingController {
  /**
   * Get available parking slots for all vehicle types
   * @route GET /api/slots
   * @returns {Object} Available slots count for each vehicle type
   */
  static async getSlots(req, res, next) {
    try {
      const slots = await ParkingModel.getAvailableSlots();
      res.json(slots);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Park a vehicle and generate ticket
   * @route POST /api/park
   * @body {string} vehicle_number - Vehicle registration number
   * @body {string} vehicle_type - Type of vehicle (Bike/Car/Truck)
   * @returns {Object} Success message with ticket ID
   */
  static async parkVehicle(req, res, next) {
    try {
      const { vehicle_number, vehicle_type } = req.body;

      // Validation
      if (!vehicle_number || !vehicle_type) {
        return res.status(400).json({
          error: 'Vehicle number and vehicle type are required'
        });
      }

      if (!['Bike', 'Car', 'Truck'].includes(vehicle_type)) {
        return res.status(400).json({
          error: 'Invalid vehicle type. Must be Bike, Car, or Truck'
        });
      }

      // Check available slots
      const occupiedCount = await ParkingModel.getOccupiedCount(vehicle_type);
      
      if (occupiedCount >= SLOT_CAPACITY[vehicle_type]) {
        return res.status(400).json({
          error: 'Parking Full',
          message: `No available slots for ${vehicle_type}`
        });
      }

      // Generate unique ticket ID
      const ticketId = uuidv4();

      // Park the vehicle
      await ParkingModel.parkVehicle(ticketId, vehicle_number, vehicle_type);

      res.status(201).json({
        message: 'Parked Successfully',
        ticket_id: ticketId,
        vehicle_number,
        vehicle_type
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Process vehicle exit and calculate charges
   * @route POST /api/exit
   * @body {string} ticket_id - Unique ticket identifier
   * @returns {Object} Exit details with calculated amount
   */
  static async exitVehicle(req, res, next) {
    try {
      const { ticket_id } = req.body;

      // Validation
      if (!ticket_id) {
        return res.status(400).json({
          error: 'Ticket ID is required'
        });
      }

      // Get parking record
      const record = await ParkingModel.getRecordByTicketId(ticket_id);

      if (!record) {
        return res.status(404).json({
          error: 'Invalid ticket ID or vehicle already exited'
        });
      }

      // Calculate duration and charges
      const entryTime = new Date(record.entry_time);
      const exitTime = new Date();
      const hours = calculateHours(entryTime, exitTime);
      const amount = calculateCharges(hours);

      // Update record with exit time and amount
      await ParkingModel.exitVehicle(ticket_id, amount);

      res.json({
        message: 'Exit Successful',
        ticket_id,
        vehicle_number: record.vehicle_number,
        vehicle_type: record.vehicle_type,
        entry_time: record.entry_time,
        exit_time: exitTime,
        hours,
        amount
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ParkingController;
