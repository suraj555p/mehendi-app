const Booking = require('../models/booking.model.js');
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Internal helper to delete booking by ID without req/res
const deleteBookingById = async (id) => {
  try {
    const deleted = await Booking.findByIdAndDelete(id);
    console.log('Rolled back booking due to error.');
    return deleted;
  } catch (err) {
    console.error('Error rolling back booking:', err.message);
  }
};

// Controller to create a new booking
const createBooking = async (req, res) => {
  let savedBooking;
  try {
    const { Design, price, clientName, email, phoneNumber, address, orderBookingDate } = req.body;

    if (!clientName || !email || !phoneNumber || !address || !orderBookingDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBooking = new Booking({
      Design,
      price,
      clientName,
      email,
      phoneNumber,
      address,
      orderBookingDate,
      status: 'pending',
    });

    savedBooking = await newBooking.save();
    console.log('Booking saved.');

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Order Confirmation - Your Order is Pending Approval',
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50;">Dear ${clientName},</h2>
          <p>Thank you for your order!</p>
          <p>Your order is pending approval. Admin will connect with you soon.</p>
          <h3>Order Details:</h3>
          <ul>
            <li><strong>Design:</strong> ${Design}</li>
            <li><strong>Price:</strong> $${price}</li>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Order Booking Date:</strong> ${new Date(orderBookingDate).toLocaleDateString()}</li>
          </ul>
          <p>Best Regards</p>
        </div>
      `,
    };

    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'New Order Notification',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50;">New Order Received</h2>
          <p>Review the following order:</p>
          <ul>
            <li><strong>Design:</strong> ${Design}</li>
            <li><strong>Price:</strong> $${price}</li>
            <li><strong>Client:</strong> ${clientName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phoneNumber}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Booking Date:</strong> ${new Date(orderBookingDate).toLocaleDateString()}</li>
          </ul>
        </div>
      `,
    };

    // Send emails
    try {
      await transporter.sendMail(mailOptions);
      console.log('Customer email sent.');
    } catch (emailErr) {
      console.error('Error sending customer email:', emailErr.message);
      await deleteBookingById(savedBooking._id);
      return res.status(500).json({ error: 'Booking saved but email failed', details: emailErr.message });
    }

    try {
      await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent.');
    } catch (adminEmailErr) {
      console.error('Admin email failed (non-critical):', adminEmailErr.message);
    }

    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    console.error('Booking creation failed:', error.message);
    if (savedBooking) {
      await deleteBookingById(savedBooking._id);
    }
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

// Controller to delete a booking by ID
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
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
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking retrieved successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve booking', details: error.message });
  }
};

// Controller to update booking status
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: updatedBooking.email,
      subject: `Your Booking Status: ${status.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Dear ${updatedBooking.clientName},</h2>
          <p>Your booking for <strong>${updatedBooking.Design}</strong> has been updated.</p>
          <p>Status: <strong>${status}</strong></p>
          <p>If you have any questions, feel free to reach out.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Failed to update booking status:', error.message);
    res.status(500).json({ error: 'Failed to update status', details: error.message });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  viewAllBookings,
  viewBookingById,
  updateBookingStatus,
};
