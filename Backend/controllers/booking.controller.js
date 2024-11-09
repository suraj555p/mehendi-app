const Booking = require('../models/booking.model.js');

// Controller to create a new booking
const createBooking = async (req, res) => {
  try {
    const { Design, price, clientName, email, phoneNumber, address, orderBookingDate } = req.body;

    // Validate required fields
    if (!Design || !price || !clientName || !email || !phoneNumber || !address || !orderBookingDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new booking document
    const newBooking = new Booking({
      Design,
      price,
      clientName,
      email,
      phoneNumber,
      address,
      orderBookingDate,
    });

    // Save to database
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

// Controller to delete a booking by ID
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID and delete
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking', details: error.message });
  }
};

// Controller to view all bookings
const viewAllBookings = async (req, res) => {
  try {
    // Retrieve all booking documents from the database
    const bookings = await Booking.find();

    res.status(200).json({ message: 'Bookings retrieved successfully', bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookings', details: error.message });
  }
};

// Controller to view a single booking by ID
const viewBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking retrieved successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve booking', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createBooking,
  deleteBooking,
  viewAllBookings,
  viewBookingById,
};
