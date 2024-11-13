import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.js';

const DynamicCard = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get('https://mehendi-app.onrender.com/api/designs'); // Adjust the URL as necessary
        setDesigns(response.data); // Assuming response.data is an array of designs
      } catch (err) {
        console.error('Error fetching designs:', err);
        setError('Failed to load designs.');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Error state
  }

  return (
    <>
      {designs.map((design) => (
        <Card
          title={design.designName} 
          description={design.description} 
          imageUrl={design.designImage1} // Ensure this is the correct path to the cover image
          price={design.price} 
          buttonText="Enquire Now"
        />
      ))}
    </>
  );
};

export default DynamicCard;