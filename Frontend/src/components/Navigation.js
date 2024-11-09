import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle Menu"
        >
          <i className="fas fa-bars"></i> {/* Menu icon for mobile view */}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-8 space-y-2 md:space-y-0 absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 z-50 transition-all duration-300 ease-in-out`}
        >
          <li>
            <Link to="/" className="text-white hover:text-gray-400 px-3 py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-400 px-3 py-2">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-400 px-3 py-2">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/orders" className="text-white hover:text-gray-400 px-3 py-2">
              Orders
            </Link>
          </li>
        </ul>

        {/* Support & Social Media */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Email Address */}
          <div className="text-right">
            <p className="text-gray-400">
              Email: <a href="mailto:chouhankajal908@gmail.com" className="hover:text-gray-300">chouhankajal908@gmail.com</a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <p className="text-gray-400">Follow Us:</p>
            <a
              href="https://www.facebook.com/profile.php?id=100090559680243&mibextid=ZbWKwL"
              aria-label="Facebook"
              className="text-white hover:text-gray-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/kajalmehandiartist12"
              aria-label="Instagram"
              className="text-white hover:text-gray-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
