const nodemailer = require('nodemailer');

let transporter;

function createTransporter() {
  // Using a popular alternative email sending service: SendGrid SMTP
  // You need to set SENDGRID_USER and SENDGRID_PASS environment variables with your SendGrid credentials
  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
    },
  });
}

transporter = createTransporter();

async function sendEmail(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendEmail,
};
