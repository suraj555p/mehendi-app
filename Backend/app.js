const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/booking.route.js');

require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Use the booking routes
app.use('/api', bookingRoutes);

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