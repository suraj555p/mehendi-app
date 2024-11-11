import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // Extract and decode the parameters from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTitle(params.get('title') || '');
    setPrice(params.get('price') || '');
  }, [location]);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phoneNumber: '',
    address: '',
    orderDate: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the booking data
    const bookingData = {
      Design: title,
      price: price,
      phoneNumber: formData.phoneNumber,
      clientName: formData.clientName,
      email: formData.email,
      address: formData.address,
      orderBookingDate: formData.orderDate,
    };

    try {
      // Send POST request to create a new booking
      const response = await axios.post('http://mehendi-app.onrender.com/api/bookings', bookingData);

      // Handle successful response
      console.log(response.data);
      
      // Navigate to a confirmation page or show a success message
      navigate('/order-success');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };
  
  

  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-lg font-semibold text-gray-800 mb-4 text-center">Price: ${price}</p>
      </div>
      <div className="w-3/5 mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Client Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="clientName">Client Name:</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Email ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email ID:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          {/* Order Booking Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="orderDate">Order Booking Date:</label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mx-auto block text-center"
          >
            Book now
          </button>
        </form>
      </div>
    </>
  );
}

export default BookingForm;