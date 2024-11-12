const express = require('express');
const { sendEmail } = require('../controllers/contactus.controller.js')

const router = express.Router();

// Route to create a new booking
router.post('/sendMail', sendEmail);


module.exports = router;
