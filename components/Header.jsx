import React from 'react';
import brainImage from '../assets/brain_image.webp'; // Ensure the path is correct and the image is renamed appropriately

function Header() {
  return (
    <header className="bg-white py-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        
        {/* Image */}
        <img
          src={brainImage}
          alt="Brain Mascot"
          className="w-20 h-20 object-contain"
        />

        {/* Heading */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Brain Tumor Detection</h1>
          <p className="text-sm text-gray-600">Upload your brain MRI scan and get instant analysis</p>
        </div>

      </div>
    </header>
  );
}

export default Header;
