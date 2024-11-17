const nodemailer = require('nodemailer');
require('dotenv').config();

exports.nodemail = async (req, res) => {
  const { email, message } = req.body;

  try {
    // Log email for debugging (remove in production)
    console.log('Received email:', email);

    // Create the transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.mymail,  // Your Gmail address from .env
        pass: process.env.password  // Your Gmail app-specific password
      }
    });

    // Set up mail options
    const mailOptions = {
      from: process.env.mymail,
      replyTo: email,  // Sender's email (the partner's email)
      to: process.env.mymail,  // Your email (the recipient's email)
      subject: 'Partner Application Request',
      text: message || 'No message provided',  // Default message if none provided
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully');
    return res.status(200).json({ message: 'Mail sent successfully!' });

  } catch (error) {
    console.error('Error sending mail:', error);
    return res.status(500).json({ message: 'Failed to send mail', error: error.message });
  }
};
