import React from 'react';
import exampleImage from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/mehendi wallpaper 1.jpg'; // Adjust path to your image file
import engagementImage from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/engagement mehendi design.jpeg'
import BridalImage from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/BridalImage1.jpeg'
import BabyShowerImage from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/babyshower.jpeg'
import GroomImage from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/groomImage.jpeg'
import logo from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/mehendi logo.jpg';
import Card from './Card.js';


function Home() {
  return (
    <>
      <div className="relative w-full h-[70vh]">
        {/* Background Image */}
        <img
          src={exampleImage}
          alt="Background"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-6 sm:p-8 md:p-10 lg:p-12">
          <img
            src={logo}
            alt="Logo"
            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-sans">
            Kajal Mehendi Artist
          </h2>
        </div>
      </div>

      <section className="min-h-screen py-8">
        <div className="text-center my-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Services
          </h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6 sm:px-8 md:px-12">
          <Card
            title="Bridal design"
            description="Bridal Mehendi designs are intricate 
            henna patterns symbolizing love and prosperity, 
            featuring detailed florals and motifs, adorning 
            the bride's hands and feet beautifully."
            imageUrl={BridalImage}
            buttonText="Enquire Now"
            price={5000}
          />
          <Card
            title="Groom design"
            description="Groom Mehendi designs are simpler 
            yet meaningful henna patterns, often featuring 
            minimalistic motifs, initials, or symbols that 
            represent love and connection with the bride."
            imageUrl={GroomImage}
            buttonText="Enquire Now"
            price={5000}
          />
          <Card
            title="Engagement design"
            description="Engagement Mehendi designs feature intricate 
            floral patterns, hearts, and couple initials, 
            symbolizing love and commitment, adding 
            elegance to pre-wedding celebrations."
            imageUrl={engagementImage}
            buttonText="Enquire Now"
            price={5000}
          />
          <Card
            title="Baby shower design"
            description="Baby shower Mehendi designs feature joyful 
            patterns like tiny feet, cradles, baby 
            toys, and floral motifs, celebrating the 
            anticipation of a newborn with delicate and playful art."
            imageUrl={BabyShowerImage}
            buttonText="Enquire Now"
            price={5000}
          />
        </div>
      </section>
    </>
  );
}

export default Home;