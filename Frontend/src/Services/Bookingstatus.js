// BookingStatus.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BookingStatus = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Try to get data from location state first
    if (location.state) {
      
      setBookingData(location.state);
    } else {
      // Fall back to sessionStorage if location state is empty
      const storedData = sessionStorage.getItem('bookingData');
      if (storedData) {
        setBookingData(JSON.parse(storedData));
      }
    }
  }, [location]);

  if (!bookingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <p className="text-red-600">No booking status available.</p>
        </div>
      </div>
    );
  }

  const { phoneNumber, clientName, status="confirmed"} = bookingData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Status</h2>
        <p className="text-lg mb-2 text-green-600">Status: {status}</p>
        <p className="text-md mb-2 text-gray-700">Client Name: <span className="font-semibold">{clientName}</span></p>
        <p className="text-md mb-2 text-gray-700">Phone Number: <span className="font-semibold">{phoneNumber}</span></p>
      </div>
    </div>
  );
};

export default BookingStatus;