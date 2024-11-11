const express = require('express');
const { createBooking, deleteBooking, viewAllBookings,viewBookingById, updateBookingStatus } = require('../controllers/booking.controller.js');

const router = express.Router();

// Route to create a new booking
router.post('/bookings', createBooking);

// Route to delete a booking by ID
router.delete('/bookings/:id', deleteBooking);

// Route to view all bookings
router.get('/bookings', viewAllBookings);

// Route to view specific bookings
router.get('/bookings/:id', viewBookingById);

router.patch('/bookings/:id/status', updateBookingStatus);

module.exports = router;
