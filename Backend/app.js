const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Set up CORS options
const corsOptions = {
  origin: ['https://mehendi-app-front.vercel.app','https://admin-pannel-one.vercel.app'], 
   credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support
app.use(express.json()); // Middleware to parse JSON requests

// Load routes
const bookingRoutes = require('./routes/booking.route.js');
const contactusRoutes = require('./routes/contactus.route.js');
const designRoutes=require('./routes/adddesigns.route.js')
const userRoute = require('./routes/user.route.js');
app.use('/api', bookingRoutes);
app.use('/api',contactusRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/auth', userRoute);

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
