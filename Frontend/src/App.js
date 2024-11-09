
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.js';
import Home from './components/Home.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Orders from './components/Orders.js';
import BookingForm from './Services/Bookingform.js';
import BookingStatus from './Services/Bookingstatus.js';

function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path='/booking' element={<BookingForm/>}/>
        <Route path='/booking-status' element={<BookingStatus/>}/>
      </Routes>
      <Footer/>
   </Router>
  );
}

export default App;
