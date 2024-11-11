const Booking = require('../models/booking.model.js');

// index.js
require('dotenv').config(); // Load environment variables from .env file
const nodemailer = require('nodemailer');

// Create a transporter object using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your email address
    pass: process.env.GMAIL_PASS, // Your app password
  },
});

// Controller to create a new booking
// const createBooking = async (req, res) => {
//   try {
//     const { Design, price, clientName, email, phoneNumber, address, orderBookingDate } = req.body;

//     // Validate required fields
//     if (!Design || !price || !clientName || !email || !phoneNumber || !address || !orderBookingDate) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Create a new booking document
//     const newBooking = new Booking({
//       Design,
//       price,
//       clientName,
//       email,
//       phoneNumber,
//       address,
//       orderBookingDate,
//     });

//     // Save to database
//     await newBooking.save();

//     console.log("Done");
    
//     // Define email options
//     const mailOptions = {
//       from: process.env.GMAIL_USER, // Sender address
//       to: email, // List of recipients
//       subject: 'Order Confirmation - Your Order is Pending Approval', // Subject line
//       text: `
//         Dear Customer,
  
//         Thank you for your order! 
  
//         Your order has been received and is pending approval. The admin will connect with you soon. 
//         All order information has been shared with you via email.
  
//         Order Details:
//         - Order ID: ${orderDetails.id}
//         - Product: ${orderDetails.product}
//         - Price: $${orderDetails.price}
//         - Quantity: ${orderDetails.quantity}
  
//         If you have any questions, feel free to reach out.
  
//         Best Regards,
//       `, // Plain text body
//       // html: '<h1>Your Order is Pending Approval</h1><p>Thank you for your order!</p>' // Optional HTML body
//     };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log('Error occurred:', error);
//   }
//   console.log('Email sent successfully:', info.response);
// });
//     res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create booking', details: error.message });
//   }
// };

const createBooking = async (req, res) => {
  let savedBooking; // Declare savedBooking outside of try block for access in case of error
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
      status: 'pending'
    });

    // Save to database
    savedBooking = await newBooking.save();

    console.log("Done");

    // Define email options using newBooking details
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Order Confirmation - Your Order is Pending Approval',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50;">Dear ${clientName},</h2>
          <p>Thank you for your order!</p>
          <p style="color: #555;">
            Your order has been received and is pending approval. The admin will connect with you soon.<br>
            All order information has been shared with you via email.
          </p>
          <h3 style="color: #333;">Order Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Design:</strong> <span style="color: #4CAF50;">${Design}</span></li>
            <li><strong>Price:</strong> <span style="color: #4CAF50;">$${price}</span></li>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Order Booking Date:</strong> ${new Date(orderBookingDate).toLocaleDateString()}</li>
          </ul>
          <p>If you have any questions, feel free to reach out.</p>
          <p style="margin-top: 20px;">Best Regards,<br>Your Company Name</p>
        </div>
      `,
    };

    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'New Order Notification',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50;">New Order Received</h2>
          <p style="color: #555;">
            A new order has been placed and is awaiting your approval. Here are the details:
          </p>
          <h3 style="color: #333;">Order Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Design:</strong> <span style="color: #4CAF50;">${Design}</span></li>
            <li><strong>Price:</strong> <span style="color: #4CAF50;">$${price}</span></li>
            <li><strong>Client Name:</strong> ${clientName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Order Booking Date:</strong> ${new Date(orderBookingDate).toLocaleDateString()}</li>
          </ul>
          <p>Please review this order and take appropriate action.</p>
          <p style="margin-top: 20px;">Best Regards,<br>Your Company Name</p>
        </div>
      `,
    };

    // Send emails using await
    await transporter.sendMail(mailOptions);
    console.log('Customer email sent successfully.');

    await transporter.sendMail(adminMailOptions);
    console.log('Admin notification sent successfully.');

    // Respond with the saved booking details
    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    console.error('Error creating booking:', error);

    // If there's an error while sending emails, delete the booking
    if (savedBooking) {
      await deleteBooking(savedBooking._id); // Call delete method with booking ID
    }

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

const updateBookingStatus = async (req, res) => {
  const { id } = req.params; // Get booking ID from parameters
  const { status } = req.body; // Get new status from request body

  // Validate status
  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    // Find the booking by ID and update its status
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Prepare email content based on the new status
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: updatedBooking.email, // Get user's email from booking document
      subject: `Your Booking Status has been Updated to ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
          <h2 style="color: #4CAF50;">Booking Status Update</h2>
          <p>Dear ${updatedBooking.clientName},</p>
          <p>Your booking for <strong>${updatedBooking.Design}</strong> has been updated.</p>
          <p>Status: <strong>${status}</strong></p>
          <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
          <p>Thank you for choosing our service!</p>
          <p>Best Regards,<br>Your Company Name</p>
        </div>
      `,
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createBooking,
  deleteBooking,
  viewAllBookings,
  viewBookingById,
  updateBookingStatus
};
