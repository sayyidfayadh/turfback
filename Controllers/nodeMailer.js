const nodemailer = require('nodemailer');
require('dotenv').config();

exports.nodemail = async (req, res) => {
  const { email, message } = req.body;

  try {
   
    console.log('Received email:', email);

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.mymail,  
        pass: process.env.password 
      }
    });

  
    const mailOptions = {
      from: process.env.mymail,
      replyTo: email,  
      to: process.env.mymail,  
      subject: 'Partner Application Request',
      text: message || 'No message provided',  
    };


    await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully');
    return res.status(200).json({ message: 'Mail sent successfully!' });

  } catch (error) {
    console.error('Error sending mail:', error);
    return res.status(500).json({ message: 'Failed to send mail', error: error.message });
  }
};
