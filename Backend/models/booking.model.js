const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  Design: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orderBookingDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'], // Restricting values
    default: 'pending', 
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Booking', bookingSchema);