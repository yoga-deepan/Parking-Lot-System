const express = require('express');
const router = express.Router();
const ParkingController = require('../controllers/parkingController');

// Get available slots
router.get('/slots', ParkingController.getSlots);

// Park a vehicle
router.post('/park', ParkingController.parkVehicle);

// Exit a vehicle
router.post('/exit', ParkingController.exitVehicle);

module.exports = router;
