const db = require('../config/database');

// Parking slot capacity
const SLOT_CAPACITY = {
  Bike: 5,
  Car: 5,
  Truck: 2
};

class ParkingModel {
  // Get available slots for each vehicle type
  static async getAvailableSlots() {
    try {
      const [rows] = await db.query(
        `SELECT vehicle_type, COUNT(*) as occupied 
         FROM parking_records 
         WHERE status = 'PARKED' 
         GROUP BY vehicle_type`
      );

      const slots = {
        Bike: SLOT_CAPACITY.Bike,
        Car: SLOT_CAPACITY.Car,
        Truck: SLOT_CAPACITY.Truck
      };

      rows.forEach(row => {
        slots[row.vehicle_type] = SLOT_CAPACITY[row.vehicle_type] - row.occupied;
      });

      return slots;
    } catch (error) {
      throw error;
    }
  }

  // Park a vehicle
  static async parkVehicle(ticketId, vehicleNumber, vehicleType) {
    try {
      const [result] = await db.query(
        `INSERT INTO parking_records (ticket_id, vehicle_number, vehicle_type, entry_time, status) 
         VALUES (?, ?, ?, NOW(), 'PARKED')`,
        [ticketId, vehicleNumber, vehicleType]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get parking record by ticket ID
  static async getRecordByTicketId(ticketId) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM parking_records WHERE ticket_id = ? AND status = 'PARKED'`,
        [ticketId]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Exit vehicle and update record
  static async exitVehicle(ticketId, amount) {
    try {
      const [result] = await db.query(
        `UPDATE parking_records 
         SET exit_time = NOW(), amount = ?, status = 'EXITED' 
         WHERE ticket_id = ? AND status = 'PARKED'`,
        [amount, ticketId]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get occupied slots count for a vehicle type
  static async getOccupiedCount(vehicleType) {
    try {
      const [rows] = await db.query(
        `SELECT COUNT(*) as count 
         FROM parking_records 
         WHERE vehicle_type = ? AND status = 'PARKED'`,
        [vehicleType]
      );
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ParkingModel;
