import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-8 px-4">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        {/* Support and Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support & Follow Us</h3>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=100090559680243&mibextid=ZbWKwL"
              aria-label="Facebook"
              className="hover:text-gray-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/kajalmehandiartist12"
              aria-label="Instagram"
              className="hover:text-gray-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Email Address */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-400">
            Email: <a href="mailto:chouhankajal908@gmail.com" className="hover:text-gray-300">chouhankajal908@gmail.com</a>
          </p>
          <p className="text-gray-400">
            Phone No. : <a href=" " className="hover:text-gray-300">9826003258</a>
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        <p>© Copyrights 2024 - 2025. Vision Mehendi Artists. All rights reserved.</p>
        <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a> | 
        <a href="/terms" className="hover:text-gray-300"> Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
