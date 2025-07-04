import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

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

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.clientName) errors.clientName = 'Client name is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid.';
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits.';
    }
    if (!formData.address) errors.address = 'Address is required.';
    if (!formData.orderDate) errors.orderDate = 'Order booking date is required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      alert('Title and price are required. Please check the URL parameters.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

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
      const response = await axios.post(
        'https://mehendi-app.onrender.com/api/bookings',
        bookingData,
      );

      console.log(response.data);
      navigate('/order-success');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Failed to create booking: ${errorMessage}`);
      console.error('Error creating booking:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-lg font-semibold text-gray-800 mb-4 text-center">Price: ${price}</p>
      </div>
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
              className={`w-full p-2 border ${formErrors.clientName ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
            {formErrors.clientName && <p className="text-red-500 text-sm">{formErrors.clientName}</p>}
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
              className={`w-full p-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
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
              className={`w-full p-2 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            ></textarea>
            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
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
              className={`w-full p-2 border ${formErrors.orderDate ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
              min={new Date().toISOString().split("T")[0]}
            />
            {formErrors.orderDate && <p className="text-red-500 text-sm">{formErrors.orderDate}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mx-auto block text-center"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book now'}
          </button>
        </form>
      </div>
    </>
  );
}

export default BookingForm;
