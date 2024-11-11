import React from 'react';

const OrderPending = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Your order has been received and is pending approval.
        </h2>
        <p className="text-lg text-gray-700 font-bold">
          The admin will connect with you soon. All order information has been shared with you via email.
        </p>
      </div>
    </div>
  );
};

export default OrderPending;