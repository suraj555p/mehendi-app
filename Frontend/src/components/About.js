import React from 'react';
import aboutImage from 'C:/Users/ACER/Desktop/Mehendi Project New/Frontend/src/about image.avif'

function About() {
  return (
    <>

    
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src={aboutImage}
          alt="Background"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-start text-white p-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-[cursive] text-black">
            About Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed font-[cursive] text-black text-center px-4 sm:px-8 md:px-12">
            Welcome to our Mehendi world! At Kajal Mehendi Artist, we bring the art of traditional and
            contemporary henna designs to life, making your special moments truly unforgettable. With years
            of expertise, our artist specializes in crafting intricate and meaningful patterns that beautifully
            adorn your hands and feet. From elegant bridal mehendi and groom's henna to creative designs for
            engagements, baby showers, and festivals, each pattern tells a unique story of love, happiness,
            and celebration. We take pride in using high-quality, natural henna that provides a deep, rich
            color and is gentle on the skin. Let us be a part of your cherished celebrations, creating stunning
            henna art that leaves a lasting impression.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;