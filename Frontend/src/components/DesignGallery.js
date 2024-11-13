import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get('https://mehendi-app.onrender.com/api/designs/');
        setDesigns(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching designs:', err);
        setError('Failed to fetch designs. Please try again later.');
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) return <div className="text-center py-6">Loading designs...</div>;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;
  if (designs.length === 0) return <div className="text-center py-6">No posts are available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-4xl font-bold text-center mb-6">Designs Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((design) => (
          <div key={design._id} className="bg-white rounded-lg shadow-md overflow-hidden w-full">
            {/* Design Name and Price */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">{design.designName}</h3>
              <p className="text-gray-700 text-lg mb-4">Price: ${design.price}</p>
            </div>

            {/* Flex container for images */}
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
              {/* Display Design Image 1 */}
              {design.designImage1 ? (
                <img
                  src={design.designImage1}
                  alt={design.designName}
                  className="w-full md:w-1/3 h-56 object-cover mb-2 md:mb-0" // Responsive width and height
                />
              ) : (
                <div className="w-full md:w-1/3 h-56 bg-gray-200 flex items-center justify-center mb-2 md:mb-0">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              {/* Display Design Image 2 */}
              {design.designImage2 ? (
                <img
                  src={design.designImage2}
                  alt={design.designName}
                  className="w-full md:w-1/3 h-56 object-cover mb-2 md:mb-0" // Responsive width and height
                />
              ) : (
                <div className="w-full md:w-1/3 h-56 bg-gray-200 flex items-center justify-center mb-2 md:mb-0">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              {/* Display Design Image 3 */}
              {design.designImage3 ? (
                <img
                  src={design.designImage3}
                  alt={design.designName}
                  className="w-full md:w-1/3 h-56 object-cover" // Responsive width and height
                />
              ) : (
                <div className="w-full md:w-1/3 h-56 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignGallery;