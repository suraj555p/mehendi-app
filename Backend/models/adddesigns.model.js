const mongoose = require('mongoose');

// Define the Design schema
const designSchema = new mongoose.Schema({
  designName: {
    type: String,
    required: true, // Make this field required
  },
  description: {
    type: String,
    required: true, // Make this field required
  },
  price: {
    type: String, // Price is defined as a string
    required: true, // Make this field required
  },
  bookingCharge: {
    type: String, // Booking charge is also defined as a string
    required: true, // Make this field required
  },
  designImage1: {
    type: String, // Assuming this will store a URL or path to the image
    default: null,
  },
  designImage2: {
    type: String, // Assuming this will store a URL or path to the image
    default: null,
  },
  designImage3: {
    type: String, // Assuming this will store a URL or path to the image
    default: null,
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the Design model from the schema
const Design = mongoose.model('Design', designSchema);

// Export the model
module.exports = mongoose.model('Design', designSchema);