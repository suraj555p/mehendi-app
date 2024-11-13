import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.id]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let errors = {};
    
    // Name validation
    if (!formData.name) {
      errors.name = 'Name is required.';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid.';
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits.';
    }

    // Message validation
    if (!formData.message) {
      errors.message = 'Message is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) return;

    try {
      const response = await fetch('https://mehendi-app.onrender.com/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear the form
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white py-12 px-6 sm:px-10 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      <p className="text-lg text-center text-gray-600 mb-12">
        We would love to hear from you! Feel free to reach out for bookings or inquiries.
      </p>
      
      <div className="max-w-3xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.name ? 'border-red-500' : ''}`}
              placeholder="Your Name"
              required
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.email ? 'border-red-500' : ''}`}
              placeholder="Your Email"
              required
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.phone ? 'border-red-500' : ''}`}
              placeholder="Your Phone Number"
              required
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.message ? 'border-red-500' : ''}`}
              placeholder="Your Message"
              required
            ></textarea>
            {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;