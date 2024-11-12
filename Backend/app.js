const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Set up CORS options
const corsOptions = {
  origin: ['https://mehendi-app-front.vercel.app', 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON requests

// Load routes
const bookingRoutes = require('./routes/booking.route.js');
const contactusRoutes = require('./routes/contactus.route.js');
const designRoutes=require('./routes/adddesigns.route.js')
app.use('/api', bookingRoutes);
app.use('/api',contactusRoutes);
app.use('/api/designs', designRoutes);

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
