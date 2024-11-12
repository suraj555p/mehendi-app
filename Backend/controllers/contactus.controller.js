require('dotenv').config(); // Load environment variables from .env file
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.GMAIL_USER, // Your email address
    pass: process.env.GMAIL_PASS, // Your email password or app password
  },
});

// Controller function to handle contact form submission
const sendEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate input data
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: process.env.GMAIL_USER, // Your email address
    to: email, // Send email to the client
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 p-6">
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 class="text-xl font-bold mb-4">New Contact Form Submission</h1>
          <p class="mb-2"><strong>Name:</strong> ${name}</p>
          <p class="mb-2"><strong>Email:</strong> ${email}</p>
          <p class="mb-2"><strong>Phone:</strong> ${phone}</p>
          <p class="mb-2"><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      </body>
      </html>
    `,
  };
  
  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Respond with success message
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
};

module.exports={
    sendEmail
};
