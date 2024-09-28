// emailService.js
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for security
    pass: process.env.EMAIL_PASS, // Use environment variables for security
  },
});

const sendEmail = (name, email, message) => {
  const mailOptions = {
    from: email,
    to: "admin-email@example.com", // Admin email address
    subject: `Contact Form Submission from ${name}`,
    text: message,
    replyTo: email, // Optional: to reply directly to the sender
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
