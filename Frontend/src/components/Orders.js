import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings'); // Adjusted URL, proxy will handle it
        setBookings(response.data.bookings);
      } catch (err) {
        setError(err.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // Filter bookings by search term (client name)
  const filteredBookings = bookings?.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the list of bookings as cards
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Status</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by client name"
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {filteredBookings?.length === 0 ? (
        <p className="text-center text-lg">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBookings?.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-bold text-lg">{booking.Design}</h3>
              <p><strong>Price:</strong> ${booking.price}</p>
              <p><strong>Client Name:</strong> {booking.clientName}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Order Booking Date:</strong> {new Date(booking.orderBookingDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;