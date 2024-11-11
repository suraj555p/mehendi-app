const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Set up CORS options
const corsOptions = {
  origin: ['https://mehendi-app-front.vercel.app', 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json()); // Middleware to parse JSON requests

// Load routes
const bookingRoutes = require('./routes/booking.route.js');
app.use('/api', bookingRoutes);

// Nodemailer setup for "Contact Us" form
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, // Use environment variable for Gmail
      pass: process.env.GMAIL_PASS,  // Use environment variable for Gmail password
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: 'suraj87parmar@gmail.com', // Replace with admin's email
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
        <h1 style="color: #4a5568; font-size: 24px; margin-bottom: 10px;">New Contact Form Submission</h1>
        <div style="margin-bottom: 20px;">
          <strong style="color: #2d3748;">Name:</strong>
          <p style="color: #4a5568;">${name}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #2d3748;">Email:</strong>
          <p style="color: #4a5568;">${email}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #2d3748;">Phone:</strong>
          <p style="color: #4a5568;">${phone}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #2d3748;">Message:</strong>
          <p style="color: #4a5568;">${message}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
