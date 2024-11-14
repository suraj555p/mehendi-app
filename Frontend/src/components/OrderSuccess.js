import React, { useState, useEffect } from 'react';

const OrderPending = () => {
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Simulate an API call or some processing
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="loader"></div> {/* Placeholder for loader */}
            <p className="mt-4 text-lg text-gray-700">Processing your order...</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Your order has been received and is pending approval.
            </h2>
            <p className="text-lg text-gray-700 font-bold">
              The admin will connect with you soon. All order information has been shared with you via email.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPending;