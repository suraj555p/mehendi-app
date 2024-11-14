import React from 'react';
import { Link } from 'react-router-dom';

function Card({ title, description, imageUrl, buttonText, price }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-lg font-bold text-gray-800 mb-4">Price: ₹{price}</p>
        {/* Pass data via URL parameters */}
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          <Link to={`/booking?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`}>{buttonText}</Link>
        </button>
      </div>
    </div>
  );
}

export default Card;
